import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { GoogleGenAI } from "@google/genai";
import { EXAMS_REGISTRY } from "@/lib/exams/registry";
import fs from "fs";
import path from "path";

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

export async function GET(request: Request) {
  // Authentication
  const authHeader = request.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}` &&
    new URL(request.url).searchParams.get("key") !== process.env.CRON_SECRET
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Load Overrides
    const overridesPath = path.resolve(process.cwd(), "data", "manual_overrides.json");
    let overrides: any = {};
    if (fs.existsSync(overridesPath)) {
      overrides = JSON.parse(fs.readFileSync(overridesPath, "utf8"));
    }

    const results = [];

    for (const examDef of EXAMS_REGISTRY) {
      console.log(`Syncing ${examDef.name}...`);
      const now = new Date();
      
      // Ensure Exam model exists
      let exam = await prisma.exam.findUnique({ where: { slug: examDef.id } });
      if (!exam) {
        exam = await prisma.exam.create({
          data: {
            name: examDef.name,
            slug: examDef.id,
            authority: examDef.authority,
            official_website: examDef.officialSite,
            notices_url: examDef.noticesPage,
            parser_version: "v1.0",
          }
        });
      }

      // Check Overrides First
      if (overrides[examDef.id] && overrides[examDef.id].override_active) {
        const events = overrides[examDef.id].events;
        await syncEventsToDb(exam.id, events, "MANUAL_OVERRIDE", 1.0, "Manual Admin Override");
        await prisma.exam.update({
          where: { id: exam.id },
          data: { last_verified_at: now, last_changed_at: now, parser_health: "HEALTHY" }
        });
        results.push({ name: exam.name, status: "overridden" });
        continue;
      }

      if (!genAI) {
        console.warn("No Gemini API key, skipping AI Normalization.");
        continue;
      }

      // 2. Pure Gemini Grounded Search
      try {
        const prompt = `
          Search the web for the official exam dates and schedule for "${examDef.name}" for the upcoming admission cycle (${new Date().getFullYear()}/${new Date().getFullYear() + 1}).
          Focus your search on official sources like "${examDef.officialSite}" or reliable educational portals.
          
          Extract the critical exam events (like Registration, Exam dates, Counselling, Results).
          
          Return ONLY a valid JSON array of objects.
          Each object must have:
          - "type": MUST be one of ["REGISTRATION", "EXAM", "COUNSELLING", "RESULT", "SEAT_ALLOTMENT"]
          - "title": A short description (e.g. "Session 1 Registration", "Phase 2 Exam")
          - "startDate": ISO 8601 string (e.g. "${new Date().getFullYear() + 1}-05-15T00:00:00Z").
          - "endDate": ISO 8601 string or null if single day.
          - "is_tentative": boolean. If you are unsure or the text says "tentative" or "expected", set to true.
          
          If no dates are found, return an empty array [].
        `;

        const response = await genAI.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }],
          }
        });

        let responseText = response.text || '[]';
        // Grounded Search sometimes includes markdown blocks or citations, so extract the JSON array
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          responseText = jsonMatch[0];
        }
        const parsedEvents = JSON.parse(responseText);
        
        if (Array.isArray(parsedEvents) && parsedEvents.length > 0) {
          // Verify we aren't hallucinating historical dates (basic sanity check)
          const validEvents = parsedEvents.filter(e => {
             const year = new Date(e.startDate).getFullYear();
             return year >= new Date().getFullYear() - 1; 
          });

          if (validEvents.length > 0) {
            const existingEvents = await prisma.examEvent.findMany({ where: { examId: exam.id } });
            const hasChanges = existingEvents.length !== validEvents.length || true; // Force update for MVP

            // Use GEMINI_SEARCH as the source type. Include the raw JSON output as snapshot for debugging.
            await syncEventsToDb(exam.id, validEvents, "GEMINI_SEARCH", 0.9, response.text || "");
            
            await prisma.exam.update({
              where: { id: exam.id },
              data: { 
                last_verified_at: now, 
                last_changed_at: hasChanges ? now : exam.last_changed_at,
                parser_health: "HEALTHY" 
              }
            });
            results.push({ name: exam.name, status: "synced", events: validEvents.length });
          } else {
             results.push({ name: exam.name, status: "no_valid_dates_found" });
          }
        } else {
          results.push({ name: exam.name, status: "no_events_found" });
        }
        
      } catch (e: any) {
        console.error(`AI normalization failed for ${examDef.name}`, e);
        await prisma.exam.update({
          where: { id: exam.id },
          data: { parser_health: "FAILED" }
        });
        results.push({ name: exam.name, status: "normalization_failed", error: e.message || String(e) });
      }

      // Add a small delay to avoid hitting Gemini free tier rate limits (15 RPM)
      await new Promise(r => setTimeout(r, 2000));
    }

    return NextResponse.json({ success: true, synced_count: results.length, results });
  } catch (error: any) {
    console.error("Sync Error:", error);
    return NextResponse.json({ error: "Sync encountered an error, preserved last known good state." }, { status: 500 });
  }
}

// Helper to wipe and rewrite events (Simplest approach for syncing)
async function syncEventsToDb(examId: string, events: any[], sourceType: any, confidence: number, rawSnapshot: string) {
  // Wipe old events
  await prisma.examEvent.deleteMany({ where: { examId } });
  
  // Insert new events
  for (const ev of events) {
    await prisma.examEvent.create({
      data: {
        examId,
        type: ev.type,
        title: ev.title,
        startDate: new Date(ev.startDate),
        endDate: ev.endDate ? new Date(ev.endDate) : null,
        is_tentative: ev.is_tentative || false,
        source_type: sourceType,
        confidence_score: confidence,
        raw_text_snapshot: rawSnapshot
      }
    });
  }
}
