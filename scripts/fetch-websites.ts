import google from 'googlethis';
import chalk from 'chalk';

export async function fetchWebsite(collegeName: string): Promise<{ url: string | null; trustScore: 'high' | 'medium' | 'low' }> {
  try {
    const options = {
      page: 0,
      safe: false,
      additional_params: {
        hl: 'en'
      }
    };

    const response = await google.search(`${collegeName} official website`, options);
    
    if (!response.results || response.results.length === 0) {
      return { url: null, trustScore: 'low' };
    }

    // Filter out directories and blogs
    const invalidDomains = ['wikipedia.org', 'shiksha.com', 'collegedunia.com', 'careers360.com', 'facebook.com', 'linkedin.com', 'instagram.com', 'youtube.com', 'twitter.com', 'justdial.com'];
    
    for (const result of response.results) {
      const lowerUrl = result.url.toLowerCase();
      
      const isInvalid = invalidDomains.some(domain => lowerUrl.includes(domain));
      if (isInvalid) continue;

      let trustScore: 'high' | 'medium' | 'low' = 'low';
      
      if (lowerUrl.includes('.ac.in') || lowerUrl.includes('.edu') || lowerUrl.includes('iit') || lowerUrl.includes('nit') || lowerUrl.includes('iim')) {
        trustScore = 'high';
      } else if (lowerUrl.includes('.in') || lowerUrl.includes('.org')) {
        trustScore = 'medium';
      }

      // Return the first valid result
      return { url: result.url, trustScore };
    }

    return { url: null, trustScore: 'low' };
  } catch (error: any) {
    console.log(chalk.red(`Failed to fetch website for ${collegeName}: ${error.message}`));
    return { url: null, trustScore: 'low' };
  }
}
