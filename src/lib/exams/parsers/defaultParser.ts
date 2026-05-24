import * as cheerio from "cheerio";

export async function parseDefault(url: string): Promise<{ rawText: string; success: boolean }> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      signal: AbortSignal.timeout(6000)
    });
    
    if (!res.ok) {
      return { rawText: "", success: false };
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    
    // Generic cleaning
    $('script, style, noscript, iframe, img, nav, footer').remove();
    
    const content = $('body').text();
    const rawText = content.replace(/\s+/g, ' ').substring(0, 5000).trim();
    
    return { rawText, success: true };
  } catch (error) {
    console.error(`Default Parser failed for ${url}:`, error);
    return { rawText: "", success: false };
  }
}
