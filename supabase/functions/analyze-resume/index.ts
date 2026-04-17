/**
 * Supabase Edge Function: analyze-resume
 * ─────────────────────────────────────────────────────────────────────────────
 * POST /functions/v1/analyze-resume
 * Body: { resumeText: string, jobRole: string }
 * Returns: AnalysisResult object
 *
 * Deploy with:
 *   npx supabase functions deploy analyze-resume
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// ── CORS headers ──────────────────────────────────────────────────────────────
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// ── Job role definitions (mirrors resumeAnalyzer.js) ─────────────────────────
const JOB_ROLES: Record<string, {
  requiredSkills: string[]
  niceToHave: string[]
  experienceKeywords: string[]
  minExperienceYears: number
  description: string
}> = {
  'Frontend Developer': {
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Git', 'Responsive Design', 'REST APIs'],
    niceToHave: ['Vue.js', 'Angular', 'Next.js', 'Webpack', 'Testing', 'GraphQL', 'Figma', 'Tailwind CSS'],
    experienceKeywords: ['frontend', 'ui', 'web development', 'react', 'angular', 'vue', 'javascript'],
    minExperienceYears: 1,
    description: 'Build user interfaces and web experiences',
  },
  'Backend Developer': {
    requiredSkills: ['Node.js', 'Python', 'Java', 'SQL', 'REST APIs', 'Git', 'Databases', 'Authentication'],
    niceToHave: ['Docker', 'Kubernetes', 'AWS', 'MongoDB', 'Redis', 'GraphQL', 'Microservices', 'CI/CD'],
    experienceKeywords: ['backend', 'server', 'api', 'database', 'node', 'python', 'java', 'spring'],
    minExperienceYears: 1,
    description: 'Build server-side logic and APIs',
  },
  'Full Stack Developer': {
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'REST APIs', 'HTML', 'CSS'],
    niceToHave: ['TypeScript', 'Docker', 'AWS', 'MongoDB', 'Next.js', 'GraphQL', 'Testing', 'CI/CD'],
    experienceKeywords: ['full stack', 'fullstack', 'frontend', 'backend', 'react', 'node', 'mern', 'mean'],
    minExperienceYears: 2,
    description: 'Work across the entire web stack',
  },
  'Data Scientist': {
    requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Analysis', 'Pandas', 'NumPy', 'Visualization'],
    niceToHave: ['TensorFlow', 'PyTorch', 'Spark', 'R', 'Deep Learning', 'NLP', 'Computer Vision', 'Tableau'],
    experienceKeywords: ['data science', 'machine learning', 'ml', 'ai', 'analytics', 'python', 'statistics'],
    minExperienceYears: 1,
    description: 'Extract insights from data using ML and statistics',
  },
  'Data Analyst': {
    requiredSkills: ['SQL', 'Excel', 'Python', 'Data Visualization', 'Statistics', 'Tableau', 'Power BI', 'Reporting'],
    niceToHave: ['R', 'Machine Learning', 'ETL', 'Spark', 'Google Analytics', 'A/B Testing', 'Looker'],
    experienceKeywords: ['data analyst', 'analytics', 'sql', 'excel', 'tableau', 'reporting', 'bi'],
    minExperienceYears: 0,
    description: 'Analyze data to support business decisions',
  },
  'DevOps Engineer': {
    requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Git', 'Scripting', 'Monitoring'],
    niceToHave: ['Terraform', 'Ansible', 'Jenkins', 'Prometheus', 'Grafana', 'Azure', 'GCP', 'Security'],
    experienceKeywords: ['devops', 'cloud', 'infrastructure', 'docker', 'kubernetes', 'aws', 'deployment'],
    minExperienceYears: 2,
    description: 'Manage infrastructure and deployment pipelines',
  },
  'UI/UX Designer': {
    requiredSkills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Typography', 'Color Theory', 'Usability Testing'],
    niceToHave: ['Adobe XD', 'Sketch', 'Illustrator', 'Photoshop', 'Motion Design', 'HTML/CSS', 'Accessibility', 'Interaction Design'],
    experienceKeywords: ['ui', 'ux', 'design', 'figma', 'wireframe', 'prototype', 'user experience'],
    minExperienceYears: 1,
    description: 'Design intuitive and beautiful user experiences',
  },
  'Machine Learning Engineer': {
    requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning', 'SQL', 'Statistics', 'Git'],
    niceToHave: ['MLOps', 'Kubernetes', 'Spark', 'NLP', 'Computer Vision', 'AWS SageMaker', 'Feature Engineering', 'Model Deployment'],
    experienceKeywords: ['machine learning', 'deep learning', 'ml', 'ai', 'neural network', 'tensorflow', 'pytorch'],
    minExperienceYears: 2,
    description: 'Build and deploy machine learning models at scale',
  },
  'Cybersecurity Analyst': {
    requiredSkills: ['Network Security', 'Linux', 'Penetration Testing', 'SIEM', 'Incident Response', 'Firewalls', 'Cryptography', 'Compliance'],
    niceToHave: ['CEH', 'CISSP', 'Python', 'Forensics', 'Cloud Security', 'Zero Trust', 'OSINT', 'Malware Analysis'],
    experienceKeywords: ['security', 'cybersecurity', 'penetration', 'network', 'siem', 'incident', 'vulnerability'],
    minExperienceYears: 1,
    description: 'Protect systems and data from cyber threats',
  },
  'Product Manager': {
    requiredSkills: ['Product Strategy', 'Roadmapping', 'Agile', 'User Stories', 'Data Analysis', 'Stakeholder Management', 'Market Research', 'Communication'],
    niceToHave: ['SQL', 'A/B Testing', 'Figma', 'JIRA', 'OKRs', 'Go-to-Market', 'Pricing Strategy', 'Technical Background'],
    experienceKeywords: ['product manager', 'product management', 'pm', 'agile', 'scrum', 'roadmap', 'product'],
    minExperienceYears: 2,
    description: 'Define and drive product vision and strategy',
  },
  'AI Engineer': {
    requiredSkills: ['Python', 'LLMs', 'Prompt Engineering', 'Machine Learning', 'APIs', 'Vector Databases', 'RAG', 'Git'],
    niceToHave: ['LangChain', 'OpenAI API', 'Fine-tuning', 'MLOps', 'FastAPI', 'Docker', 'Embeddings', 'Agents'],
    experienceKeywords: ['ai', 'llm', 'generative ai', 'prompt engineering', 'langchain', 'openai', 'artificial intelligence'],
    minExperienceYears: 1,
    description: 'Build AI-powered applications using LLMs and ML',
  },
  'Cloud Engineer': {
    requiredSkills: ['AWS', 'Azure', 'GCP', 'Linux', 'Networking', 'Security', 'Terraform', 'Docker'],
    niceToHave: ['Kubernetes', 'Ansible', 'Python', 'Serverless', 'Cost Optimization', 'IAM', 'VPC', 'Load Balancing'],
    experienceKeywords: ['cloud', 'aws', 'azure', 'gcp', 'infrastructure', 'serverless', 'cloud engineer'],
    minExperienceYears: 2,
    description: 'Design and manage cloud infrastructure',
  },
  'Mobile Developer': {
    requiredSkills: ['React Native', 'Flutter', 'iOS', 'Android', 'JavaScript', 'Git', 'REST APIs', 'UI Design'],
    niceToHave: ['Swift', 'Kotlin', 'Firebase', 'Push Notifications', 'App Store', 'Testing', 'Performance', 'TypeScript'],
    experienceKeywords: ['mobile', 'ios', 'android', 'react native', 'flutter', 'app development', 'swift', 'kotlin'],
    minExperienceYears: 1,
    description: 'Build cross-platform and native mobile applications',
  },
  'QA Engineer': {
    requiredSkills: ['Manual Testing', 'Automation Testing', 'Selenium', 'Test Cases', 'Bug Reporting', 'JIRA', 'API Testing', 'Regression Testing'],
    niceToHave: ['Cypress', 'Playwright', 'Performance Testing', 'CI/CD', 'Python', 'JavaScript', 'Load Testing', 'Security Testing'],
    experienceKeywords: ['qa', 'quality assurance', 'testing', 'automation', 'selenium', 'test', 'bug'],
    minExperienceYears: 1,
    description: 'Ensure software quality through testing and automation',
  },
}

// ── Core analysis logic ───────────────────────────────────────────────────────
function analyzeResume(resumeText: string, jobRole: string) {
  const text = resumeText.toLowerCase()
  const roleData = JOB_ROLES[jobRole]
  if (!roleData) return null

  const foundRequired = roleData.requiredSkills.filter(s => text.includes(s.toLowerCase()))
  const missingRequired = roleData.requiredSkills.filter(s => !text.includes(s.toLowerCase()))
  const foundNiceToHave = roleData.niceToHave.filter(s => text.includes(s.toLowerCase()))
  const missingNiceToHave = roleData.niceToHave.filter(s => !text.includes(s.toLowerCase()))
  const experienceMatches = roleData.experienceKeywords.filter(kw => text.includes(kw.toLowerCase()))

  const yearMatches = text.match(/(\d+)\+?\s*years?\s*(of\s*)?(experience|exp)/gi) || []
  const maxYears = yearMatches.reduce((max, m) => Math.max(max, parseInt(m) || 0), 0)

  const requiredScore   = (foundRequired.length / roleData.requiredSkills.length) * 60
  const niceToHaveScore = (foundNiceToHave.length / roleData.niceToHave.length) * 20
  const experienceScore = Math.min((experienceMatches.length / roleData.experienceKeywords.length) * 15, 15)
  const yearsScore      = maxYears >= roleData.minExperienceYears ? 5 : (maxYears / Math.max(roleData.minExperienceYears, 1)) * 5

  const score = Math.min(Math.max(Math.round(requiredScore + niceToHaveScore + experienceScore + yearsScore), 5), 98)

  let eligibility = 'Low'
  if (score >= 75) eligibility = 'High'
  else if (score >= 50) eligibility = 'Medium'
  else if (score >= 30) eligibility = 'Low-Medium'

  const recommendations: string[] = []
  if (missingRequired.length > 0) recommendations.push(`Learn these critical skills: ${missingRequired.slice(0, 3).join(', ')}`)
  if (maxYears < roleData.minExperienceYears) recommendations.push(`Gain at least ${roleData.minExperienceYears} year(s) of relevant experience`)
  if (foundNiceToHave.length < 3) recommendations.push(`Add bonus skills like: ${missingNiceToHave.slice(0, 3).join(', ')}`)
  if (experienceMatches.length < 2) recommendations.push('Add more relevant keywords and project descriptions to your resume')

  return {
    score,
    eligibility,
    jobRole,
    foundRequired,
    missingRequired,
    foundNiceToHave,
    missingNiceToHave,
    requiredCoverage: Math.round((foundRequired.length / roleData.requiredSkills.length) * 100),
    experienceYears: maxYears,
    recommendations,
    breakdown: {
      requiredSkills: Math.round(requiredScore),
      niceToHave: Math.round(niceToHaveScore),
      experience: Math.round(experienceScore + yearsScore),
    },
    roleDescription: roleData.description,
    analyzedAt: new Date().toISOString(),
    source: 'edge-function',
  }
}

// ── Request handler ───────────────────────────────────────────────────────────
serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await req.json()
    const { resumeText, jobRole } = body

    // Input validation
    if (!resumeText || typeof resumeText !== 'string') {
      return new Response(JSON.stringify({ error: 'resumeText is required and must be a string' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    if (!jobRole || typeof jobRole !== 'string') {
      return new Response(JSON.stringify({ error: 'jobRole is required and must be a string' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    if (resumeText.length > 100_000) {
      return new Response(JSON.stringify({ error: 'resumeText too long (max 100,000 characters)' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    if (!JOB_ROLES[jobRole]) {
      return new Response(JSON.stringify({ error: `"${jobRole}" is not a supported job role` }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Run analysis
    const result = analyzeResume(resumeText, jobRole)

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('[analyze-resume] Error:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
