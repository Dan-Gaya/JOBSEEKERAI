import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const skillAnalysisTool = createTool({
  id: 'analyze-skills',
  description: 'Analyze skill requirements from job data and provide career recommendations',
  inputSchema: z.object({
    userSkills: z.array(z.string()).describe('Array of user current skills'),
    jobResults: z.array(z.object({
      skills: z.array(z.string())
    })).describe('Job search results to analyze'),
    targetRole: z.string().optional().describe('Desired job role for analysis'),
  }),
  outputSchema: z.object({
    topSkills: z.array(z.string()),
    skillGaps: z.array(z.object({
      skill: z.string(),
      frequency: z.number(),
      priority: z.string(),
    })),
    recommendations: z.array(z.string()),
    resumeTips: z.array(z.string()),
  }),
  execute: async ({ context }) => {
    const { userSkills, jobResults, targetRole } = context;
    
    // Extract all skills from job results
    const allSkills = jobResults.flatMap(job => job.skills);
    
    // Calculate skill frequency
    const skillFrequency: Record<string, number> = {};
    allSkills.forEach(skill => {
      skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
    });

    // Get top 10 most demanded skills
    const topSkills = Object.entries(skillFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([skill]) => skill);

    // Identify skill gaps
    const skillGaps = topSkills
      .filter(skill => !userSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      ))
      .map(skill => ({
        skill,
        frequency: skillFrequency[skill],
        priority: skillFrequency[skill] > 5 ? 'high' : skillFrequency[skill] > 2 ? 'medium' : 'low'
      }));

    // Generate recommendations
    const recommendations = [
      `Focus on learning: ${skillGaps.slice(0, 3).map(gap => gap.skill).join(', ')}`,
      `Consider certifications in high-demand areas like ${topSkills.slice(0, 2).join(' or ')}`,
      `Highlight your ${userSkills.filter(skill => topSkills.includes(skill)).slice(0, 3).join(', ')} experience in your resume`
    ];

    // Generate resume tips
    const resumeTips = [
      'Include specific projects demonstrating your key skills',
      'Use metrics to quantify your achievements',
      'Tailor your resume to include keywords from job descriptions',
      'Highlight both technical and soft skills',
      'Keep your resume updated with latest industry trends'
    ];

    return {
      topSkills,
      skillGaps,
      recommendations,
      resumeTips,
    };
  },
});