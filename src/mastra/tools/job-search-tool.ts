import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const jobSearchTool = createTool({
  id: 'search-jobs',
  description: 'Search for job listings based on keywords, location, and job type',
  inputSchema: z.object({
    query: z.string().describe('Job title, keywords, or company'),
    location: z.string().optional().describe('City, state, or country'),
    employment_type: z.string().optional().describe('Full-time, part-time, contract, etc.'),
    page: z.number().optional().describe('Page number for pagination'),
  }),
  outputSchema: z.object({
    jobs: z.array(z.object({
      id: z.string(),
      title: z.string(),
      company: z.string(),
      location: z.string(),
      employment_type: z.string(),
      description: z.string(),
      skills: z.array(z.string()),
      posted_date: z.string(),
      apply_url: z.string(),
    })),
    total: z.number(),
    page: z.number(),
  }),
  execute: async ({ context }) => {
    const { query, location, employment_type, page = 1 } = context;
    
    // Get API key with better error handling
    const apiKey = process.env.JSEARCH_API_KEY;
    
    if (!apiKey) {
      throw new Error('JSearch API key is not configured. Please check your .env file and add a valid RapidAPI key.');
    }

    // Build search parameters
    const searchParams = new URLSearchParams({
      query: query || 'developer',
      page: page.toString(),
      num_pages: '1'
    });

    if (location) searchParams.append('location', location);
    if (employment_type) searchParams.append('employment_type', employment_type);

    const headers: Record<string, string> = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    };

    const options: RequestInit = {
      method: 'GET',
      headers
    };

    try {
      console.log('Fetching jobs from JSearch API...');
      const response = await fetch(
        `https://jsearch.p.rapidapi.com/search?${searchParams}`,
        options
      );
      
      console.log('JSearch API Response Status:', response.status);
      
      if (response.status === 401) {
        throw new Error('JSearch API: 401 Unauthorized - Please check your RapidAPI key and subscription');
      }
      
      if (response.status === 403) {
        throw new Error('JSearch API: 403 Forbidden - API key may be invalid or subscription expired');
      }
      
      if (response.status === 429) {
        throw new Error('JSearch API: 429 Too Many Requests - Rate limit exceeded');
      }
      
      if (!response.ok) {
        throw new Error(`JSearch API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      // Check if API returned an error in the response body
      if (data.status !== 'OK' && data.message) {
        throw new Error(`JSearch API: ${data.message}`);
      }

      if (!data.data || !Array.isArray(data.data)) {
        throw new Error('JSearch API returned invalid data format');
      }
      
      // Transform API response to our format
      const jobs = data.data.map((job: any) => ({
        id: job.job_id || `job-${Math.random().toString(36).substr(2, 9)}`,
        title: job.job_title || 'No title available',
        company: job.employer_name || 'Unknown company',
        location: job.job_city || job.job_country || 'Remote',
        employment_type: (job.job_employment_type?.toLowerCase() || 'full-time'),
        description: job.job_description || 'No description available',
        skills: extractSkillsFromDescription(job.job_description || ''),
        posted_date: job.job_posted_at_datetime_utc || new Date().toISOString(),
        apply_url: job.job_apply_link || '#',
      }));

      console.log(`Found ${jobs.length} jobs for query: ${query}`);
      
      return {
        jobs: jobs.slice(0, 10), // Limit to 10 jobs
        total: jobs.length,
        page: page
      };

    } catch (error) {
      console.error('JSearch API Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to fetch job listings: ${errorMessage}`);
    }
  },
});

// Helper function to extract skills from job description
function extractSkillsFromDescription(description: string): string[] {
  const commonSkills = [
    'javascript', 'python', 'java', 'react', 'node.js', 'aws', 'docker', 'kubernetes',
    'sql', 'mongodb', 'typescript', 'angular', 'vue', 'php', 'c#', 'c++', 'go',
    'rust', 'swift', 'kotlin', 'ruby', 'rails', 'django', 'flask', 'spring',
    'machine learning', 'ai', 'data analysis', 'cloud computing', 'devops',
    'ci/cd', 'jenkins', 'git', 'agile', 'scrum', 'rest api', 'graphql',
    'microservices', 'serverless', 'terraform', 'ansible'
  ];

  const descriptionLower = description.toLowerCase();
  return commonSkills.filter(skill => 
    descriptionLower.includes(skill.toLowerCase())
  ).slice(0, 8);
}