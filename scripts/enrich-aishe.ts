import * as fs from 'fs';
import * as path from 'path';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyCVjih3St6odzu8i7v8tfhjvavcjhpkT6o";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${GEMINI_API_KEY}`;

const mdPath = path.join(process.cwd(), 'University-ALL UNIVERSITIES.md');
const rawPath = path.join(process.cwd(), 'data', 'colleges.raw.json');
const enrichedPath = path.join(process.cwd(), 'data', 'colleges.enriched.json');

// Helper to generate a slug
function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function fetchFromGemini(prompt: string) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    signal: controller.signal,
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json"
      }
    })
  });

  clearTimeout(timeoutId);

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API Error: ${response.statusText} - ${err}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

async function processCollege(collegeName: string, state: string, district: string, year: string, retries = 3): Promise<any> {
  const prompt = `You are a data enrichment AI. Provide accurate information for the university "${collegeName}" located in ${district}, ${state}, India. 
Respond ONLY with a valid JSON object matching this structure:
{
  "description": "A short 2-3 sentence overview.",
  "fees_min": 50000,
  "fees_max": 200000,
  "placement_percentage": 85,
  "avg_salary": 600000,
  "rating": 4.2,
  "nirf_rank": 50, // use null if unranked
  "type": "PRIVATE", // or "GOVERNMENT"
  "exam": ["JEE Main", "CUET"], // Array of accepted exams
  "courses": [
    { "name": "B.Tech CSE", "duration": "4 years", "fees": 150000, "seats": 120 },
    { "name": "MBA", "duration": "2 years", "fees": 200000, "seats": 60 }
  ]
}
Return ONLY valid JSON. Do not include markdown formatting or backticks.`;

  for (let i = 0; i < retries; i++) {
    try {
      let content = await fetchFromGemini(prompt);
      // Clean markdown if present
      content = content.replace(/^```json/i, '').replace(/^```/i, '').replace(/```$/i, '').trim();
      const data = JSON.parse(content);
      return data;
    } catch (err: any) {
      console.error(`Attempt ${i + 1} failed for ${collegeName}: ${err.message}`);
      if (i === retries - 1) return null;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

async function main() {
  console.log("Loading markdown list...");
  const content = fs.readFileSync(mdPath, 'utf8');
  const lines = content.split('\n');
  const candidates: any[] = [];
  
  for (const line of lines) {
    if (!line.startsWith('|U-') && !line.startsWith('|')) continue;
    const parts = line.split('|').map(p => p.trim());
    if (parts.length < 8) continue;
    
    const name = parts[2];
    const state = parts[3];
    const district = parts[4];
    const website = parts[5] && parts[5] !== '-' ? parts[5] : '';
    const yearStr = parts[6];
    const year = parseInt(yearStr) || 2000;
    
    if (name && name !== 'Name' && !name.includes('**Name**') && name.trim().length > 3) {
      candidates.push({ name, state, district, website, year });
    }
  }
  
  console.log(`Found ${candidates.length} universities in Markdown.`);

  let existingData = [];
  if (fs.existsSync(rawPath)) {
    existingData = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
  }
  
  const existingSlugs = new Set(existingData.map((c: any) => c.slug));
  let addedCount = 0;

  // Process sequentially to completely avoid API connection hanging
  const chunkSize = 1;
  for (let i = 0; i < candidates.length; i += chunkSize) {
    const chunk = candidates.slice(i, i + chunkSize);
    const promises = chunk.map(async (college) => {
      const slug = generateSlug(college.name);
      if (existingSlugs.has(slug)) {
        return null;
      }
      
      console.log(`Processing: ${college.name}...`);
      const enriched = await processCollege(college.name, college.state, college.district, college.year);
      
      if (enriched) {
        return {
          name: college.name,
          slug,
          location: `${college.district}, ${college.state}`,
          state: college.state,
          city: college.district,
          established: college.year,
          website: college.website,
          image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
          ...enriched
        };
      }
      return null;
    });

    const results = await Promise.all(promises);
    
    // Add a 4500ms delay to respect 15 RPM free tier limit
    await new Promise(r => setTimeout(r, 4500));
    const validResults = results.filter(r => r !== null);
    
    if (validResults.length > 0) {
      existingData.push(...validResults);
      validResults.forEach(r => existingSlugs.add(r.slug));
      addedCount += validResults.length;
      
      // Save progress frequently
      fs.writeFileSync(rawPath, JSON.stringify(existingData, null, 2), 'utf8');
      console.log(`Saved chunk. Total added: ${addedCount}`);
    }
  }

  console.log(`\n✅ Finished! Added ${addedCount} universities to the raw dataset.`);
  console.log(`Next, run 'npx tsx prisma/seed.ts' to load them into the database.`);
}

main().catch(console.error);
