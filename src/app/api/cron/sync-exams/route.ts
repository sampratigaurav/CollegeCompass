import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { GoogleGenAI } from "@google/genai";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";

// 1. Static Registry
const EXAMS_REGISTRY = [
  { name: "JEE Main", officialUrl: "https://jeemain.nta.nic.in" },
  { name: "JEE Advanced", officialUrl: "https://jeeadv.ac.in" },
  { name: "NEET", officialUrl: "https://neet.nta.nic.in" },
  { name: "BITSAT", officialUrl: "https://bitsadmission.com" },
  { name: "KCET", officialUrl: "https://cetonline.karnataka.gov.in/kea" },
  { name: "COMEDK", officialUrl: "https://www.comedk.org" },
];

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

export async function GET(request: Request) {
  // Authentication (optional for manual testing, mandatory for prod)
  const authHeader = request.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}` &&
    new URL(request.url).searchParams.get("key") !== process.env.CRON_SECRET
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 2. Load Overrides
    const overridesPath = path.resolve(process.cwd(), "data", "manual_overrides.json");
    let overrides: any = {};
    if (fs.existsSync(overridesPath)) {
      overrides = JSON.parse(fs.readFileSync(overridesPath, "utf8"));
    }

    const results = [];

    for (const exam of EXAMS_REGISTRY) {
      console.log(`Syncing ${exam.name}...`);
      
      const existingExam = await prisma.exam.findUnique({ where: { name: exam.name } });
      let finalDates = {
        counselling_starts: existingExam?.counselling_starts || null,
        registration_ends: existingExam?.registration_ends || null,
        exam_date: existingExam?.exam_date || null,
      };
      
      let confidence = 0;
      let sourceType = "existing_db";
      let parseMethod = "none";

      // A. Soft Human Override Layer
      if (overrides[exam.name] && overrides[exam.name].override_active) {
        finalDates = {
          counselling_starts: overrides[exam.name].counselling_starts,
          registration_ends: overrides[exam.name].registration_ends,
          exam_date: overrides[exam.name].exam_date,
        };
        confidence = 1.0;
        sourceType = "manual_override";
        parseMethod = "human";
      } 
      // B. Hybrid Pipeline
      else if (genAI) {
        let scrapedText = "";
        try {
          // Attempt lightweight scraping
          const res = await fetch(exam.officialUrl, { 
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
            signal: AbortSignal.timeout(5000) 
          });
          if (res.ok) {
            const html = await res.text();
            const $ = cheerio.load(html);
            $('script, style, noscript, iframe, img').remove();
            scrapedText = $('body').text().replace(/\s+/g, ' ').substring(0, 8000);
          }
        } catch (e) {
          console.error(`Scrape failed for ${exam.name}, falling back strictly to AI search`);
        }

        // Gemini Interpretation & Normalization
        try {
          const prompt = `
            You are a strict data extraction engine.
            Extract the 2025/2026 exam dates for "${exam.name}".
            
            Context (scraped from official site):
            ${scrapedText ? scrapedText : 'No scraped context available. Use Google Search.'}
            
            Return ONLY a valid JSON object with these exact keys, using null if unknown:
            {
              "counselling_starts": "Month YYYY",
              "registration_ends": "Month DD, YYYY",
              "exam_date": "Month DD, YYYY"
            }
          `;

          const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              tools: [{ googleSearch: {} }],
              responseMimeType: "application/json",
            }
          });

          const jsonRes = JSON.parse(response.text || '{}');
          
          // 3. Validation Layer & Sanity Checks
          const currentYear = new Date().getFullYear();
          let isValid = true;
          
          if (jsonRes.exam_date && jsonRes.exam_date.includes(String(currentYear - 2))) {
            isValid = false; // Reject impossible historical dates
          }

          if (isValid && (jsonRes.exam_date || jsonRes.registration_ends)) {
            finalDates = {
              counselling_starts: jsonRes.counselling_starts || finalDates.counselling_starts,
              registration_ends: jsonRes.registration_ends || finalDates.registration_ends,
              exam_date: jsonRes.exam_date || finalDates.exam_date,
            };
            confidence = 0.90;
            sourceType = scrapedText ? "official_html" : "google_search";
            parseMethod = "gemini_normalization";
          }
        } catch (e) {
          console.error(`AI extraction failed for ${exam.name}`, e);
          // Gracefully fallback to existing database values
        }
      }

      // 4. Change Detection & History
      let hasChanges = false;
      const previousDates = {
        counselling_starts: existingExam?.counselling_starts,
        registration_ends: existingExam?.registration_ends,
        exam_date: existingExam?.exam_date,
      };

      if (
        finalDates.exam_date !== previousDates.exam_date ||
        finalDates.registration_ends !== previousDates.registration_ends ||
        finalDates.counselling_starts !== previousDates.counselling_starts
      ) {
        hasChanges = true;
      }

      // 5. Upsert
      const now = new Date();
      await prisma.exam.upsert({
        where: { name: exam.name },
        update: {
          ...finalDates,
          website: exam.officialUrl,
          source_url: exam.officialUrl,
          last_synced_at: now,
          last_updated_at: hasChanges ? now : existingExam?.last_updated_at,
          has_changes: hasChanges,
          confidence,
          source_type: sourceType,
          parse_method: parseMethod,
          previous_dates: hasChanges ? (previousDates as any) : existingExam?.previous_dates,
        },
        create: {
          name: exam.name,
          ...finalDates,
          website: exam.officialUrl,
          source_url: exam.officialUrl,
          last_synced_at: now,
          last_updated_at: now,
          has_changes: false,
          confidence,
          source_type: sourceType,
          parse_method: parseMethod,
        }
      });

      results.push({ name: exam.name, updated: hasChanges, dates: finalDates });
    }

    return NextResponse.json({ success: true, synced_count: results.length, results });
  } catch (error: any) {
    console.error("Sync Error:", error);
    // Never crash, fail gracefully
    return NextResponse.json({ error: "Sync encountered an error, preserved last known good state." }, { status: 500 });
  }
}
