import { ImageValidationResult } from './validate-images';

export interface ScoredImage extends ImageValidationResult {
  score: number;
  source: 'wikimedia' | 'pexels' | 'official' | 'google' | 'fallback';
}

export function scoreImage(validImage: ImageValidationResult, source: ScoredImage['source']): ScoredImage {
  let score = 0;
  
  if (!validImage.isValid || !validImage.width || !validImage.aspectRatio) {
    return { ...validImage, score: 0, source };
  }

  // 1. Resolution Score (max ~40 points)
  // E.g., 1200px width = 12 points, 4000px = 40 points
  score += Math.min(40, validImage.width / 100);

  // 2. Landscape Score (max 20 points)
  // Ideal cinematic ratio is ~1.77 (16:9). 
  if (validImage.aspectRatio >= 1.6 && validImage.aspectRatio <= 1.9) {
    score += 20;
  } else if (validImage.aspectRatio >= 1.4) {
    score += 10;
  }

  // 3. Keyword / URL Heuristics (max 20 points)
  const lowerUrl = validImage.url.toLowerCase();
  if (lowerUrl.includes('campus') || lowerUrl.includes('building') || lowerUrl.includes('aerial')) {
    score += 15;
  }
  if (lowerUrl.includes('architecture') || lowerUrl.includes('exterior')) {
    score += 10;
  }

  // 4. Source Trust Score
  if (source === 'wikimedia') score += 10;
  if (source === 'official') score += 5;
  
  // 5. Penalties
  if (lowerUrl.includes('logo') || lowerUrl.includes('emblem') || lowerUrl.includes('crest')) {
    score -= 50;
  }
  if (lowerUrl.includes('student') || lowerUrl.includes('event') || lowerUrl.includes('convocation')) {
    score -= 20;
  }
  if (lowerUrl.includes('map') || lowerUrl.includes('plan')) {
    score -= 40;
  }

  return {
    ...validImage,
    score: Math.max(0, Math.round(score)),
    source
  };
}
