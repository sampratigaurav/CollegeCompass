import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

// Simple in-memory cache for MVP. On Vercel, this persists per cold-start instance.
const cache = new Map<string, string>();

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload, userContext } = body;

    if (!action || !payload) {
      return NextResponse.json({ error: "Missing action or payload" }, { status: 400 });
    }

    const cacheKey = JSON.stringify({ action, payload, userContext });
    if (cache.has(cacheKey)) {
      return NextResponse.json({ insight: cache.get(cacheKey) });
    }

    if (!ai) {
      // Deterministic fallback if API key is missing
      return NextResponse.json({ insight: getDeterministicFallback(action, payload) });
    }

    let prompt = "";

    if (action === "EXPLAIN_FIT") {
      const { college } = payload;
      const { priorities, stream } = userContext;
      
      prompt = `
      You are a highly analytical data-driven college advisor. 
      Analyze the fit for this user:
      User prefers stream: ${stream || 'Any'}
      User priorities: ${priorities?.join(', ') || 'General Academic Excellence'}
      
      College: ${college.name}
      Tags: ${college.tags?.join(', ')}
      Best For: ${college.best_for?.join(', ')}
      Avg Salary: ${college.avg_salary ? `₹${(college.avg_salary/100000).toFixed(1)} LPA` : 'N/A'}
      
      Write exactly 2 to 3 concise, highly analytical sentences explaining why this college is a strong fit.
      Do NOT use hype words (amazing, incredible). Use words like 'suits', 'aligns with', 'offers'.
      Do NOT mention "AI". Reference the actual data (like placement stats or tags).
      `;
    } else if (action === "COMPARE_TRADEOFFS") {
      const { colleges } = payload;
      
      const collegeDetails = colleges.map((c: any) => 
        `${c.name}: Fees ~₹${c.fees_max.toLocaleString()}, Placements ~₹${c.avg_salary ? (c.avg_salary/100000).toFixed(1) + ' LPA' : 'N/A'}, Best For: ${c.best_for?.join(', ')}`
      ).join('\n');

      prompt = `
      You are a highly analytical data-driven college advisor.
      Compare these colleges and provide a trade-off summary:
      
      ${collegeDetails}
      
      Write exactly 2 to 3 concise sentences highlighting the objective trade-offs between them.
      Example format: "Compared to X, Y offers lower fees but X provides stronger placement ROI. Z serves as a middle ground with excellent research output."
      Be direct, analytical, and strictly grounded in the provided data.
      `;
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.2, // Keep it highly deterministic and analytical
      }
    });

    const insight = response.text?.trim() || getDeterministicFallback(action, payload);
    
    // Cache the successful result
    cache.set(cacheKey, insight);

    return NextResponse.json({ insight });

  } catch (error) {
    console.error("Insights API Error:", error);
    // Silent fallback on error
    return NextResponse.json({ insight: "This institution aligns with baseline academic standards based on available placement and ranking data." });
  }
}

function getDeterministicFallback(action: string, payload: any): string {
  if (action === "EXPLAIN_FIT") {
    const { college } = payload;
    return `${college.name} is well-regarded for ${college.best_for?.[0] || 'academic excellence'}. Based on its profile, it aligns well with your primary search criteria.`;
  }
  if (action === "COMPARE_TRADEOFFS") {
    const { colleges } = payload;
    return `Each institution offers distinct advantages. ${colleges[0]?.name} is notable for its specific focus areas, while ${colleges[1]?.name} provides alternative strengths in outcomes and culture.`;
  }
  return "Insights are currently unavailable, but this selection meets standard criteria.";
}
