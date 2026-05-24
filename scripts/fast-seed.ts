import * as fs from 'fs';
import * as path from 'path';

const mdPath = path.join(process.cwd(), 'University-ALL UNIVERSITIES.md');
const rawPath = path.join(process.cwd(), 'data', 'colleges.raw.json');

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function getCollegeType(typeStr: string) {
  const t = typeStr.toLowerCase();
  if (t.includes('private')) return 'PRIVATE';
  if (t.includes('deemed')) return 'DEEMED';
  if (t.includes('state') || t.includes('central') || t.includes('government')) return 'GOVERNMENT';
  return 'PRIVATE'; // fallback
}

function generatePlaceholder(college: any) {
  const type = getCollegeType(college.type);
  const isGov = type === 'GOVERNMENT';
  
  return {
    name: college.name,
    slug: generateSlug(college.name),
    location: `${college.district}, ${college.state}`,
    state: college.state,
    city: college.district,
    established: parseInt(college.year) || null,
    website: college.website,
    image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    description: `${college.name} is a renowned ${type.toLowerCase()} university located in ${college.district}, ${college.state}. It offers a wide variety of undergraduate and postgraduate programs dedicated to fostering academic excellence.`,
    fees_min: isGov ? 20000 : 80000,
    fees_max: isGov ? 100000 : 300000,
    placement_percentage: isGov ? 65 : 75,
    avg_salary: isGov ? 350000 : 450000,
    rating: isGov ? 3.8 : 4.0,
    nirf_rank: null,
    type: type,
    exam: ["CUET", "State Entrance Test"],
    courses: [
      {
        name: "B.Tech CSE",
        duration: "4 years",
        fees: isGov ? 40000 : 120000,
        seats: 60
      },
      {
        name: "MBA",
        duration: "2 years",
        fees: isGov ? 50000 : 150000,
        seats: 60
      }
    ]
  };
}

async function main() {
  const mdContent = fs.readFileSync(mdPath, 'utf8');
  
  const existingData = fs.existsSync(rawPath) ? JSON.parse(fs.readFileSync(rawPath, 'utf8')) : [];
  const existingSlugs = new Set(existingData.map((c: any) => c.slug));

  const lines = mdContent.split('\n');
  const candidates = [];

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
    const type = "GOVERNMENT"; // default placeholder
    
    if (name && name !== 'Name' && !name.includes('**Name**') && name.trim().length > 3) {
      candidates.push({ name, state, district, type, year, website });
    }
  }

  console.log(`Found ${candidates.length} universities in Markdown.`);
  let addedCount = 0;

  for (const college of candidates) {
    const slug = generateSlug(college.name);
    if (!existingSlugs.has(slug)) {
      const newCollege = generatePlaceholder(college);
      existingData.push(newCollege);
      existingSlugs.add(slug);
      addedCount++;
    }
  }

  fs.writeFileSync(rawPath, JSON.stringify(existingData, null, 2));
  console.log(`✅ Finished! Fast-seeded ${addedCount} missing universities to the raw dataset.`);
  console.log(`Total universities now ready for database: ${existingData.length}`);
}

main().catch(console.error);
