import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { GoogleGenAI } from "@google/genai";
import { EXAMS_REGISTRY } from "@/lib/exams/registry";
import { fetchExamNotices } from "@/lib/exams";
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

      // 2. Fetch from Official Source
      const extraction = await fetchExamNotices(examDef.id);
      
      if (!extraction.success || !extraction.rawText) {
        console.warn(`Parser failed or returned empty for ${examDef.name}`);
        await prisma.exam.update({
          where: { id: exam.id },
          data: { parser_health: "WARNING" }
        });
        results.push({ name: exam.name, status: "parser_failed" });
        continue; // Fallback: preserve existing data
      }

      // 3. AI Normalization
      try {
        const prompt = `
          You are a strict data extraction engine for a college admissions platform.
          Extract the critical exam events (like Registration, Exam dates, Counselling, Results) for "${examDef.name}".
          
          Context (scraped directly from their official notice board):
          ${extraction.rawText.substring(0, 5000)}
          
          Return ONLY a valid JSON array of objects.
          Each object must have:
          - "type": MUST be one of ["REGISTRATION", "EXAM", "COUNSELLING", "RESULT", "SEAT_ALLOTMENT"]
          - "title": A short description (e.g. "Session 1 Registration", "Phase 2 Exam")
          - "startDate": ISO 8601 string (e.g. "2025-05-15T00:00:00Z").
          - "endDate": ISO 8601 string or null if single day.
          - "is_tentative": boolean. If the text says "tentative" or "expected", set to true.
          
          Only extract events relevant to the current admission cycle (${new Date().getFullYear()}/${new Date().getFullYear()+1}).
          If no dates are found in the text, return an empty array [].
        `;

        const response = await genAI.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          }
        });

        const parsedEvents = JSON.parse(response.text || '[]');
        
        if (Array.isArray(parsedEvents) && parsedEvents.length > 0) {
          // Verify we aren't hallucinating historical dates (basic sanity check)
          const validEvents = parsedEvents.filter(e => {
             const year = new Date(e.startDate).getFullYear();
             return year >= new Date().getFullYear() - 1; 
          });

          if (validEvents.length > 0) {
            // Check for diffs before saving to DB
            const existingEvents = await prisma.examEvent.findMany({ where: { examId: exam.id } });
            // Very simple diff detection: if count differs or dates differ, consider it changed.
            const hasChanges = existingEvents.length !== validEvents.length || true; // Force update for MVP

            await syncEventsToDb(exam.id, validEvents, "HTML_NOTICE", 0.9, extraction.rawText);
            
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
        
      } catch (e) {
        console.error(`AI normalization failed for ${examDef.name}`, e);
        await prisma.exam.update({
          where: { id: exam.id },
          data: { parser_health: "FAILED" }
        });
        results.push({ name: exam.name, status: "normalization_failed" });
      }
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
