import { validateImage } from './validate-images';
import { scoreImage, ScoredImage } from './score-images';
import google from 'googlethis';
import chalk from 'chalk';

export async function fetchWikimediaImage(collegeName: string): Promise<ScoredImage | null> {
  try {
    // Search for the page first
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(collegeName)}&format=json&utf8=1`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (!searchData.query?.search?.length) return null;

    const pageTitle = searchData.query.search[0].title;

    // Get images for that page
    const imagesUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(pageTitle)}&pithumbsize=1500&format=json`;
    const imagesRes = await fetch(imagesUrl);
    const imagesData = await imagesRes.json();

    const pages = imagesData.query?.pages;
    if (!pages) return null;

    const pageId = Object.keys(pages)[0];
    const imageUrl = pages[pageId]?.thumbnail?.source;

    if (!imageUrl) return null;

    const validated = await validateImage(imageUrl);
    return scoreImage(validated, 'wikimedia');
  } catch (error) {
    return null;
  }
}

export async function fetchPexelsImage(query: string): Promise<ScoredImage | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query + ' university campus architecture')}&per_page=5&orientation=landscape`, {
      headers: {
        Authorization: apiKey
      }
    });
    const data = await res.json();

    if (!data.photos?.length) return null;

    for (const photo of data.photos) {
      const imageUrl = photo.src.large2x || photo.src.original;
      const validated = await validateImage(imageUrl);
      if (validated.isValid) {
        return scoreImage(validated, 'pexels');
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function fetchGoogleImage(collegeName: string): Promise<ScoredImage | null> {
  try {
    const images = await google.image(`${collegeName} university campus`, { safe: false });
    
    if (!images || images.length === 0) return null;

    // Try top 3
    for (const img of images.slice(0, 3)) {
      const validated = await validateImage(img.url);
      if (validated.isValid) {
        return scoreImage(validated, 'google');
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function findBestImage(collegeName: string, deduplicationSet: Set<string>): Promise<ScoredImage | null> {
  let candidates: ScoredImage[] = [];

  // Priority 1: Wikimedia
  const wikiImage = await fetchWikimediaImage(collegeName);
  if (wikiImage && wikiImage.isValid && !deduplicationSet.has(wikiImage.url)) {
    candidates.push(wikiImage);
    // If it's really good, just return it immediately
    if (wikiImage.score >= 50) return wikiImage;
  }

  // Priority 2: Pexels
  const pexelsImage = await fetchPexelsImage(collegeName);
  if (pexelsImage && pexelsImage.isValid && !deduplicationSet.has(pexelsImage.url)) {
    candidates.push(pexelsImage);
    if (pexelsImage.score >= 50) return pexelsImage;
  }

  // Priority 3: Google Scraper (Last resort, as requested)
  // Only if no valid candidates found yet
  if (candidates.length === 0) {
    console.log(chalk.yellow(`  [${collegeName}] Falling back to Google Image Scraper`));
    const googleImg = await fetchGoogleImage(collegeName);
    if (googleImg && googleImg.isValid && !deduplicationSet.has(googleImg.url)) {
      candidates.push(googleImg);
    }
  }

  if (candidates.length === 0) return null;

  // Sort by score descending
  candidates.sort((a, b) => b.score - a.score);
  
  return candidates[0];
}
