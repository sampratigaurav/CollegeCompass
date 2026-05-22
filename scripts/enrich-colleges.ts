import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import pLimit from 'p-limit';
import chalk from 'chalk';
import { fetchWebsite } from './fetch-websites';
import { findBestImage } from './fetch-images';

const RAW_PATH = path.resolve(process.cwd(), 'data', 'colleges.raw.json');
const ENRICHED_PATH = path.resolve(process.cwd(), 'data', 'colleges.enriched.json');
const CACHE_PATH = path.resolve(process.cwd(), 'cache', 'enrichment-cache.json');

// Ensure directories exist
if (!fs.existsSync(path.dirname(CACHE_PATH))) {
  fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
}

// Load cache
let cache: Record<string, any> = {};
if (fs.existsSync(CACHE_PATH)) {
  cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
}

function saveCache() {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}

function getPriority(name: string): 'high' | 'normal' {
  const upper = name.toUpperCase();
  if (
    upper.includes('INDIAN INSTITUTE OF TECHNOLOGY') ||
    upper.includes('IIT ') ||
    upper.includes('INDIAN INSTITUTE OF MANAGEMENT') ||
    upper.includes('IIM ') ||
    upper.includes('NATIONAL INSTITUTE OF TECHNOLOGY') ||
    upper.includes('NIT ') ||
    upper.includes('ALL INDIA INSTITUTE OF MEDICAL SCIENCES') ||
    upper.includes('AIIMS ') ||
    upper.includes('BITS ') ||
    upper.includes('BIRLA INSTITUTE')
  ) {
    return 'high';
  }
  return 'normal';
}

async function main() {
  console.log(chalk.blue.bold('🚀 Starting College Enrichment Pipeline'));

  if (!fs.existsSync(RAW_PATH)) {
    console.error(chalk.red(`Raw data not found at ${RAW_PATH}`));
    process.exit(1);
  }

  const colleges = JSON.parse(fs.readFileSync(RAW_PATH, 'utf8'));
  const enrichedColleges: any[] = [];
  const imageDeduplicationSet = new Set<string>();

  // Populate deduplication set with cached images
  for (const c of Object.values(cache)) {
    if (c.image_url) imageDeduplicationSet.add(c.image_url);
  }

  const limit = pLimit(3); // 3 concurrent requests to avoid aggressive rate limiting

  const promises = colleges.map((college: any, index: number) => limit(async () => {
    const slug = college.slug;
    const priority = getPriority(college.name);
    
    // Prefix logging with progress
    const logPrefix = `[${index + 1}/${colleges.length}] ${chalk.cyan(college.name)}`;
    
    if (cache[slug]) {
      console.log(`${logPrefix} ${chalk.gray('(Cached)')}`);
      enrichedColleges.push({ ...college, ...cache[slug], verification_priority: priority });
      return;
    }

    console.log(`${logPrefix} ${chalk.yellow('Processing...')}`);

    // 1. Fetch Website
    const websiteRes = await fetchWebsite(college.name);
    const official_website = websiteRes.url;
    
    // 2. Fetch Image
    const bestImage = await findBestImage(college.name, imageDeduplicationSet);
    let image_url = null;
    let image_source = 'fallback';
    
    if (bestImage) {
      image_url = bestImage.url;
      image_source = bestImage.source;
      imageDeduplicationSet.add(image_url);
    }

    const enrichmentData = {
      website: official_website || college.website, // fallback to existing fake site if not found
      image_url: image_url || college.image_url,
      image_source,
      domain_trust: websiteRes.trustScore,
      image_score: bestImage?.score || 0,
      enriched_at: new Date().toISOString()
    };

    cache[slug] = enrichmentData;
    saveCache();

    console.log(`  └─ Web: ${chalk.green(enrichmentData.website)} (${enrichmentData.domain_trust})`);
    console.log(`  └─ Img: ${image_url ? chalk.green('Found') : chalk.red('Fallback')} [${image_source}, Score: ${enrichmentData.image_score}]`);

    enrichedColleges.push({ ...college, ...enrichmentData, verification_priority: priority });
  }));

  await Promise.all(promises);

  fs.writeFileSync(ENRICHED_PATH, JSON.stringify(enrichedColleges, null, 2));
  console.log(chalk.green.bold(`\n✅ Enrichment complete! Saved to ${ENRICHED_PATH}`));
}

main().catch(console.error);
