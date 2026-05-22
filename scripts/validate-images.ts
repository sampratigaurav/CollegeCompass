import probe from 'probe-image-size';

export interface ImageValidationResult {
  isValid: boolean;
  width?: number;
  height?: number;
  aspectRatio?: number;
  type?: string;
  url: string;
  reason?: string;
}

export async function validateImage(url: string): Promise<ImageValidationResult> {
  try {
    // Basic URL check
    if (!url.startsWith('http')) {
      return { isValid: false, url, reason: 'Invalid URL format' };
    }

    // Reject query-heavy, tiny thumbnails, suspicious CDN params
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('thumb') || lowerUrl.includes('icon') || lowerUrl.includes('favicon')) {
      return { isValid: false, url, reason: 'URL indicates thumbnail or icon' };
    }

    // Use probe to get headers and first bytes to determine size
    const result = await probe(url, { rejectUnauthorized: false, timeout: 5000 });
    
    if (!result || !result.width || !result.height) {
      return { isValid: false, url, reason: 'Could not determine dimensions' };
    }

    if (result.type === 'svg' || result.type === 'ico') {
      return { isValid: false, url, reason: 'Unsupported type (SVG/ICO)' };
    }

    const aspectRatio = result.width / result.height;

    if (result.width < 1000) {
      return { isValid: false, url, width: result.width, height: result.height, aspectRatio, reason: 'Width < 1000px' };
    }

    if (aspectRatio < 1.3) {
      return { isValid: false, url, width: result.width, height: result.height, aspectRatio, reason: 'Aspect ratio < 1.3 (not landscape)' };
    }

    return {
      isValid: true,
      url,
      width: result.width,
      height: result.height,
      aspectRatio,
      type: result.type
    };
  } catch (error: any) {
    return { isValid: false, url, reason: `Probe failed: ${error.message}` };
  }
}
