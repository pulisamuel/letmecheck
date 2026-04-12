// Job role definitions with required skills, experience, and keywords
export const JOB_ROLES = {
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
    experienceKeywords: ['ui', 'ux', 'design', 'figma', 'wireframe', 'prototype', 'user experience', 'user interface'],
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
  'Blockchain Developer': {
    requiredSkills: ['Solidity', 'Ethereum', 'Smart Contracts', 'Web3.js', 'JavaScript', 'Git', 'Cryptography', 'DeFi'],
    niceToHave: ['Rust', 'Solana', 'Hardhat', 'Truffle', 'IPFS', 'NFT', 'Layer 2', 'Security Auditing'],
    experienceKeywords: ['blockchain', 'solidity', 'ethereum', 'smart contract', 'web3', 'defi', 'nft', 'crypto'],
    minExperienceYears: 1,
    description: 'Build decentralized applications and smart contracts',
  },
  'Site Reliability Engineer': {
    requiredSkills: ['Linux', 'Python', 'Kubernetes', 'Monitoring', 'Incident Management', 'CI/CD', 'Automation', 'Networking'],
    niceToHave: ['Go', 'Prometheus', 'Grafana', 'Chaos Engineering', 'SLO/SLA', 'Terraform', 'AWS', 'Distributed Systems'],
    experienceKeywords: ['sre', 'site reliability', 'reliability', 'kubernetes', 'monitoring', 'incident', 'automation'],
    minExperienceYears: 3,
    description: 'Maintain reliability and scalability of production systems',
  },
  'Database Administrator': {
    requiredSkills: ['SQL', 'MySQL', 'PostgreSQL', 'Performance Tuning', 'Backup & Recovery', 'Security', 'Indexing', 'Replication'],
    niceToHave: ['MongoDB', 'Oracle', 'Redis', 'Cloud Databases', 'Automation', 'Python', 'High Availability', 'Partitioning'],
    experienceKeywords: ['dba', 'database', 'sql', 'mysql', 'postgresql', 'oracle', 'database administrator'],
    minExperienceYears: 2,
    description: 'Manage and optimize database systems',
  },
  'Business Analyst': {
    requiredSkills: ['Requirements Gathering', 'Process Mapping', 'SQL', 'Excel', 'Stakeholder Management', 'Documentation', 'Data Analysis', 'Communication'],
    niceToHave: ['Power BI', 'Tableau', 'JIRA', 'Agile', 'UML', 'Visio', 'Python', 'Project Management'],
    experienceKeywords: ['business analyst', 'requirements', 'process', 'stakeholder', 'analysis', 'documentation', 'ba'],
    minExperienceYears: 1,
    description: 'Bridge business needs and technical solutions',
  },
  'Technical Writer': {
    requiredSkills: ['Technical Writing', 'Documentation', 'Markdown', 'API Documentation', 'Content Strategy', 'Editing', 'Research', 'Communication'],
    niceToHave: ['DITA', 'Confluence', 'Git', 'HTML', 'Swagger', 'Video Tutorials', 'UX Writing', 'Localization'],
    experienceKeywords: ['technical writer', 'documentation', 'writing', 'api docs', 'content', 'technical documentation'],
    minExperienceYears: 1,
    description: 'Create clear technical documentation and guides',
  },
  'Solutions Architect': {
    requiredSkills: ['System Design', 'AWS', 'Microservices', 'Security', 'Networking', 'Databases', 'API Design', 'Cloud Architecture'],
    niceToHave: ['Azure', 'GCP', 'Kubernetes', 'Serverless', 'Cost Optimization', 'Compliance', 'DevOps', 'Enterprise Architecture'],
    experienceKeywords: ['solutions architect', 'architecture', 'system design', 'aws', 'cloud', 'enterprise', 'architect'],
    minExperienceYears: 5,
    description: 'Design scalable and secure system architectures',
  },
  'AI Engineer': {
    requiredSkills: ['Python', 'LLMs', 'Prompt Engineering', 'Machine Learning', 'APIs', 'Vector Databases', 'RAG', 'Git'],
    niceToHave: ['LangChain', 'OpenAI API', 'Fine-tuning', 'MLOps', 'FastAPI', 'Docker', 'Embeddings', 'Agents'],
    experienceKeywords: ['ai', 'llm', 'generative ai', 'prompt engineering', 'langchain', 'openai', 'artificial intelligence'],
    minExperienceYears: 1,
    description: 'Build AI-powered applications using LLMs and ML',
  },
}

// Courses database
export const COURSES_DB = {
  'Frontend Developer': [
    { id: 'fe1', title: 'Complete React Developer Course', provider: 'Udemy', duration: '40 hours', level: 'Beginner', rating: 4.8, students: 125000, skill: 'React', free: false, price: '$14.99', image: '⚛️', description: 'Master React from scratch with hooks, context, and modern patterns.' },
    { id: 'fe2', title: 'JavaScript: The Complete Guide', provider: 'Udemy', duration: '52 hours', level: 'Beginner', rating: 4.7, students: 200000, skill: 'JavaScript', free: false, price: '$12.99', image: '🟨', description: 'Deep dive into modern JavaScript ES6+ features.' },
    { id: 'fe3', title: 'CSS Mastery & Responsive Design', provider: 'Coursera', duration: '20 hours', level: 'Beginner', rating: 4.6, students: 80000, skill: 'CSS', free: true, price: 'Free', image: '🎨', description: 'Build beautiful, responsive layouts with CSS Grid and Flexbox.' },
    { id: 'fe4', title: 'TypeScript for React Developers', provider: 'Frontend Masters', duration: '15 hours', level: 'Intermediate', rating: 4.9, students: 45000, skill: 'TypeScript', free: false, price: '$39/mo', image: '🔷', description: 'Add type safety to your React applications.' },
    { id: 'fe5', title: 'Next.js & React - The Complete Guide', provider: 'Udemy', duration: '25 hours', level: 'Intermediate', rating: 4.8, students: 95000, skill: 'Next.js', free: false, price: '$14.99', image: '▲', description: 'Build full-stack React apps with Next.js.' },
  ],
  'Backend Developer': [
    { id: 'be1', title: 'Node.js - The Complete Guide', provider: 'Udemy', duration: '40 hours', level: 'Beginner', rating: 4.7, students: 150000, skill: 'Node.js', free: false, price: '$14.99', image: '🟢', description: 'Build REST APIs and backend services with Node.js.' },
    { id: 'be2', title: 'Python Backend Development', provider: 'Coursera', duration: '30 hours', level: 'Beginner', rating: 4.6, students: 90000, skill: 'Python', free: true, price: 'Free', image: '🐍', description: 'Build scalable backends with Python and Django/FastAPI.' },
    { id: 'be3', title: 'SQL & Database Design Masterclass', provider: 'Udemy', duration: '22 hours', level: 'Beginner', rating: 4.8, students: 110000, skill: 'SQL', free: false, price: '$12.99', image: '🗄️', description: 'Master SQL and relational database design.' },
    { id: 'be4', title: 'Docker & Kubernetes Bootcamp', provider: 'Udemy', duration: '18 hours', level: 'Intermediate', rating: 4.7, students: 70000, skill: 'Docker', free: false, price: '$14.99', image: '🐳', description: 'Containerize and orchestrate your applications.' },
    { id: 'be5', title: 'REST API Design Best Practices', provider: 'Pluralsight', duration: '8 hours', level: 'Intermediate', rating: 4.5, students: 40000, skill: 'REST APIs', free: false, price: '$29/mo', image: '🔌', description: 'Design clean, scalable REST APIs.' },
  ],
  'Data Scientist': [
    { id: 'ds1', title: 'Python for Data Science & ML', provider: 'Udemy', duration: '45 hours', level: 'Beginner', rating: 4.8, students: 180000, skill: 'Python', free: false, price: '$14.99', image: '🐍', description: 'Complete Python for data science with pandas, numpy, and sklearn.' },
    { id: 'ds2', title: 'Machine Learning A-Z', provider: 'Udemy', duration: '44 hours', level: 'Intermediate', rating: 4.7, students: 220000, skill: 'Machine Learning', free: false, price: '$14.99', image: '🤖', description: 'Hands-on machine learning with Python and R.' },
    { id: 'ds3', title: 'Deep Learning Specialization', provider: 'Coursera', duration: '80 hours', level: 'Advanced', rating: 4.9, students: 300000, skill: 'Deep Learning', free: false, price: '$49/mo', image: '🧠', description: 'Master deep learning with Andrew Ng.' },
    { id: 'ds4', title: 'Statistics for Data Science', provider: 'edX', duration: '16 hours', level: 'Beginner', rating: 4.6, students: 60000, skill: 'Statistics', free: true, price: 'Free', image: '📊', description: 'Statistical foundations for data science.' },
    { id: 'ds5', title: 'Data Visualization with Python', provider: 'Coursera', duration: '12 hours', level: 'Beginner', rating: 4.5, students: 55000, skill: 'Visualization', free: true, price: 'Free', image: '📈', description: 'Create stunning visualizations with matplotlib and seaborn.' },
  ],
  'Full Stack Developer': [
    { id: 'fs1', title: 'MERN Stack - Complete Guide', provider: 'Udemy', duration: '48 hours', level: 'Intermediate', rating: 4.8, students: 130000, skill: 'React', free: false, price: '$14.99', image: '🔄', description: 'Build full-stack apps with MongoDB, Express, React, Node.' },
    { id: 'fs2', title: 'The Web Developer Bootcamp', provider: 'Udemy', duration: '65 hours', level: 'Beginner', rating: 4.8, students: 400000, skill: 'JavaScript', free: false, price: '$14.99', image: '🌐', description: 'Complete web development from HTML to Node.js.' },
    { id: 'fs3', title: 'Next.js Full Stack Development', provider: 'Vercel', duration: '20 hours', level: 'Intermediate', rating: 4.9, students: 85000, skill: 'Next.js', free: true, price: 'Free', image: '▲', description: 'Build production-ready full-stack apps with Next.js.' },
    { id: 'fs4', title: 'PostgreSQL & SQL Mastery', provider: 'Udemy', duration: '22 hours', level: 'Beginner', rating: 4.7, students: 75000, skill: 'SQL', free: false, price: '$12.99', image: '🐘', description: 'Master PostgreSQL for full-stack development.' },
  ],
  'DevOps Engineer': [
    { id: 'do1', title: 'AWS Certified Solutions Architect', provider: 'A Cloud Guru', duration: '50 hours', level: 'Intermediate', rating: 4.8, students: 200000, skill: 'AWS', free: false, price: '$35/mo', image: '☁️', description: 'Prepare for AWS Solutions Architect certification.' },
    { id: 'do2', title: 'Docker & Kubernetes Complete Guide', provider: 'Udemy', duration: '22 hours', level: 'Intermediate', rating: 4.7, students: 90000, skill: 'Kubernetes', free: false, price: '$14.99', image: '🐳', description: 'Master containerization and orchestration.' },
    { id: 'do3', title: 'CI/CD with Jenkins & GitHub Actions', provider: 'Pluralsight', duration: '12 hours', level: 'Intermediate', rating: 4.6, students: 45000, skill: 'CI/CD', free: false, price: '$29/mo', image: '⚙️', description: 'Automate your deployment pipelines.' },
    { id: 'do4', title: 'Linux Administration Bootcamp', provider: 'Udemy', duration: '18 hours', level: 'Beginner', rating: 4.7, students: 80000, skill: 'Linux', free: false, price: '$12.99', image: '🐧', description: 'Master Linux for DevOps and system administration.' },
  ],
  'UI/UX Designer': [
    { id: 'ux1', title: 'Google UX Design Certificate', provider: 'Coursera', duration: '200 hours', level: 'Beginner', rating: 4.8, students: 500000, skill: 'User Research', free: false, price: '$49/mo', image: '🎨', description: 'Complete UX design program by Google.' },
    { id: 'ux2', title: 'Figma UI Design Masterclass', provider: 'Udemy', duration: '15 hours', level: 'Beginner', rating: 4.9, students: 120000, skill: 'Figma', free: false, price: '$12.99', image: '✏️', description: 'Master Figma for UI design and prototyping.' },
    { id: 'ux3', title: 'UX Research & Strategy', provider: 'Interaction Design Foundation', duration: '30 hours', level: 'Intermediate', rating: 4.7, students: 60000, skill: 'User Research', free: false, price: '$16/mo', image: '🔍', description: 'Learn user research methods and UX strategy.' },
    { id: 'ux4', title: 'Design Systems with Figma', provider: 'Designcode', duration: '10 hours', level: 'Intermediate', rating: 4.8, students: 35000, skill: 'Design Systems', free: false, price: '$15/mo', image: '🧩', description: 'Build scalable design systems.' },
  ],
  'Machine Learning Engineer': [
    { id: 'ml1', title: 'TensorFlow Developer Certificate', provider: 'Coursera', duration: '60 hours', level: 'Intermediate', rating: 4.8, students: 150000, skill: 'TensorFlow', free: false, price: '$49/mo', image: '🔥', description: 'Prepare for TensorFlow Developer certification.' },
    { id: 'ml2', title: 'PyTorch for Deep Learning', provider: 'Fast.ai', duration: '40 hours', level: 'Intermediate', rating: 4.9, students: 80000, skill: 'PyTorch', free: true, price: 'Free', image: '🔦', description: 'Practical deep learning with PyTorch.' },
    { id: 'ml3', title: 'MLOps Specialization', provider: 'Coursera', duration: '50 hours', level: 'Advanced', rating: 4.7, students: 40000, skill: 'MLOps', free: false, price: '$49/mo', image: '🚀', description: 'Deploy and maintain ML models in production.' },
    { id: 'ml4', title: 'NLP with Transformers', provider: 'Hugging Face', duration: '20 hours', level: 'Advanced', rating: 4.9, students: 55000, skill: 'NLP', free: true, price: 'Free', image: '💬', description: 'Build NLP applications with transformers.' },
  ],
  'Cybersecurity Analyst': [
    { id: 'cs1', title: 'CompTIA Security+ Prep', provider: 'Udemy', duration: '30 hours', level: 'Beginner', rating: 4.7, students: 100000, skill: 'Network Security', free: false, price: '$14.99', image: '🔒', description: 'Prepare for CompTIA Security+ certification.' },
    { id: 'cs2', title: 'Ethical Hacking Bootcamp', provider: 'Udemy', duration: '35 hours', level: 'Intermediate', rating: 4.8, students: 85000, skill: 'Penetration Testing', free: false, price: '$14.99', image: '🕵️', description: 'Learn ethical hacking and penetration testing.' },
    { id: 'cs3', title: 'SOC Analyst Training', provider: 'Cybrary', duration: '25 hours', level: 'Intermediate', rating: 4.6, students: 50000, skill: 'SIEM', free: false, price: '$59/mo', image: '🛡️', description: 'Become a Security Operations Center analyst.' },
    { id: 'cs4', title: 'Linux for Security Professionals', provider: 'Pluralsight', duration: '15 hours', level: 'Beginner', rating: 4.5, students: 40000, skill: 'Linux', free: false, price: '$29/mo', image: '🐧', description: 'Linux fundamentals for cybersecurity.' },
  ],
  'Product Manager': [
    { id: 'pm1', title: 'Product Management Fundamentals', provider: 'Coursera', duration: '25 hours', level: 'Beginner', rating: 4.7, students: 90000, skill: 'Product Strategy', free: false, price: '$49/mo', image: '📋', description: 'Learn the fundamentals of product management.' },
    { id: 'pm2', title: 'Agile & Scrum Masterclass', provider: 'Udemy', duration: '12 hours', level: 'Beginner', rating: 4.8, students: 120000, skill: 'Agile', free: false, price: '$12.99', image: '🔄', description: 'Master Agile methodologies and Scrum framework.' },
    { id: 'pm3', title: 'Product Analytics with SQL', provider: 'Mode Analytics', duration: '10 hours', level: 'Intermediate', rating: 4.6, students: 35000, skill: 'Data Analysis', free: true, price: 'Free', image: '📊', description: 'Use SQL for product analytics and decision making.' },
    { id: 'pm4', title: 'User Story Mapping', provider: 'Pluralsight', duration: '8 hours', level: 'Intermediate', rating: 4.5, students: 25000, skill: 'User Stories', free: false, price: '$29/mo', image: '🗺️', description: 'Create effective user story maps for product planning.' },
  ],
  'Data Analyst': [
    { id: 'da1', title: 'Google Data Analytics Certificate', provider: 'Coursera', duration: '180 hours', level: 'Beginner', rating: 4.8, students: 600000, skill: 'Data Analysis', free: false, price: '$49/mo', image: '📊', description: 'Complete data analytics program by Google.' },
    { id: 'da2', title: 'SQL for Data Analysis', provider: 'Udacity', duration: '20 hours', level: 'Beginner', rating: 4.7, students: 80000, skill: 'SQL', free: true, price: 'Free', image: '🗄️', description: 'Master SQL for data analysis and reporting.' },
    { id: 'da3', title: 'Tableau Desktop Specialist', provider: 'Tableau', duration: '15 hours', level: 'Beginner', rating: 4.8, students: 70000, skill: 'Tableau', free: false, price: '$35/mo', image: '📈', description: 'Create interactive dashboards with Tableau.' },
    { id: 'da4', title: 'Excel for Data Analysis', provider: 'Coursera', duration: '10 hours', level: 'Beginner', rating: 4.6, students: 100000, skill: 'Excel', free: true, price: 'Free', image: '📗', description: 'Advanced Excel for data analysis and visualization.' },
  ],
  'Cloud Engineer': [
    { id: 'ce1', title: 'AWS Certified Cloud Practitioner', provider: 'AWS', duration: '30 hours', level: 'Beginner', rating: 4.8, students: 300000, skill: 'AWS', free: false, price: '$29/mo', image: '☁️', description: 'Start your AWS cloud journey with the foundational certification.' },
    { id: 'ce2', title: 'Terraform: Infrastructure as Code', provider: 'Udemy', duration: '18 hours', level: 'Intermediate', rating: 4.7, students: 85000, skill: 'Terraform', free: false, price: '$14.99', image: '🏗️', description: 'Automate cloud infrastructure with Terraform.' },
    { id: 'ce3', title: 'Microsoft Azure Fundamentals AZ-900', provider: 'Microsoft Learn', duration: '20 hours', level: 'Beginner', rating: 4.8, students: 200000, skill: 'Azure', free: true, price: 'Free', image: '🔵', description: 'Learn Azure cloud fundamentals and get certified.' },
    { id: 'ce4', title: 'Google Cloud Associate Engineer', provider: 'Coursera', duration: '40 hours', level: 'Intermediate', rating: 4.7, students: 90000, skill: 'GCP', free: false, price: '$49/mo', image: '🌐', description: 'Prepare for Google Cloud Associate Engineer exam.' },
  ],
  'Mobile Developer': [
    { id: 'mob1', title: 'React Native - The Practical Guide', provider: 'Udemy', duration: '38 hours', level: 'Beginner', rating: 4.7, students: 110000, skill: 'React Native', free: false, price: '$14.99', image: '📱', description: 'Build iOS and Android apps with React Native.' },
    { id: 'mob2', title: 'Flutter & Dart - The Complete Guide', provider: 'Udemy', duration: '42 hours', level: 'Beginner', rating: 4.8, students: 130000, skill: 'Flutter', free: false, price: '$14.99', image: '🦋', description: 'Build beautiful cross-platform apps with Flutter.' },
    { id: 'mob3', title: 'iOS & Swift - The Complete Developer Course', provider: 'Udemy', duration: '55 hours', level: 'Beginner', rating: 4.8, students: 95000, skill: 'iOS', free: false, price: '$14.99', image: '🍎', description: 'Build iOS apps with Swift from scratch.' },
    { id: 'mob4', title: 'Android Development with Kotlin', provider: 'Google', duration: '30 hours', level: 'Beginner', rating: 4.7, students: 80000, skill: 'Android', free: true, price: 'Free', image: '🤖', description: 'Official Google Android development course with Kotlin.' },
  ],
  'QA Engineer': [
    { id: 'qa1', title: 'Selenium WebDriver with Java', provider: 'Udemy', duration: '28 hours', level: 'Beginner', rating: 4.7, students: 90000, skill: 'Selenium', free: false, price: '$14.99', image: '🧪', description: 'Master Selenium automation testing with Java.' },
    { id: 'qa2', title: 'Cypress End-to-End Testing', provider: 'Udemy', duration: '15 hours', level: 'Intermediate', rating: 4.8, students: 55000, skill: 'Cypress', free: false, price: '$12.99', image: '🌲', description: 'Modern web testing with Cypress.' },
    { id: 'qa3', title: 'API Testing with Postman', provider: 'Udemy', duration: '10 hours', level: 'Beginner', rating: 4.6, students: 70000, skill: 'API Testing', free: false, price: '$12.99', image: '📮', description: 'Test REST APIs professionally with Postman.' },
    { id: 'qa4', title: 'ISTQB Foundation Level Prep', provider: 'Udemy', duration: '12 hours', level: 'Beginner', rating: 4.5, students: 45000, skill: 'Manual Testing', free: false, price: '$12.99', image: '📋', description: 'Prepare for ISTQB Foundation Level certification.' },
  ],
  'Blockchain Developer': [
    { id: 'bc1', title: 'Ethereum and Solidity: The Complete Guide', provider: 'Udemy', duration: '24 hours', level: 'Beginner', rating: 4.7, students: 75000, skill: 'Solidity', free: false, price: '$14.99', image: '⛓️', description: 'Build smart contracts and DApps on Ethereum.' },
    { id: 'bc2', title: 'Web3.js & Blockchain Development', provider: 'Udemy', duration: '18 hours', level: 'Intermediate', rating: 4.6, students: 40000, skill: 'Web3.js', free: false, price: '$14.99', image: '🌐', description: 'Connect web apps to the blockchain with Web3.js.' },
    { id: 'bc3', title: 'DeFi and Smart Contract Security', provider: 'Coursera', duration: '20 hours', level: 'Advanced', rating: 4.7, students: 25000, skill: 'DeFi', free: false, price: '$49/mo', image: '🔐', description: 'Audit and secure DeFi protocols and smart contracts.' },
  ],
  'Site Reliability Engineer': [
    { id: 'sre1', title: 'Site Reliability Engineering Fundamentals', provider: 'Coursera', duration: '25 hours', level: 'Intermediate', rating: 4.7, students: 40000, skill: 'Monitoring', free: false, price: '$49/mo', image: '🔧', description: 'Learn SRE principles from Google.' },
    { id: 'sre2', title: 'Prometheus & Grafana Monitoring', provider: 'Udemy', duration: '14 hours', level: 'Intermediate', rating: 4.6, students: 35000, skill: 'Monitoring', free: false, price: '$12.99', image: '📊', description: 'Set up production monitoring with Prometheus and Grafana.' },
    { id: 'sre3', title: 'Go Programming for DevOps & SRE', provider: 'Udemy', duration: '20 hours', level: 'Intermediate', rating: 4.7, students: 30000, skill: 'Automation', free: false, price: '$14.99', image: '🐹', description: 'Learn Go for building reliable infrastructure tools.' },
  ],
  'Database Administrator': [
    { id: 'dba1', title: 'PostgreSQL Administration Bootcamp', provider: 'Udemy', duration: '20 hours', level: 'Beginner', rating: 4.7, students: 55000, skill: 'PostgreSQL', free: false, price: '$14.99', image: '🐘', description: 'Master PostgreSQL administration and optimization.' },
    { id: 'dba2', title: 'MySQL DBA Certification Prep', provider: 'Udemy', duration: '18 hours', level: 'Intermediate', rating: 4.6, students: 45000, skill: 'MySQL', free: false, price: '$12.99', image: '🐬', description: 'Prepare for MySQL DBA certification.' },
    { id: 'dba3', title: 'MongoDB for DBAs', provider: 'MongoDB University', duration: '15 hours', level: 'Intermediate', rating: 4.8, students: 60000, skill: 'MongoDB', free: true, price: 'Free', image: '🍃', description: 'Official MongoDB DBA course from MongoDB University.' },
  ],
  'Business Analyst': [
    { id: 'ba1', title: 'Business Analysis Fundamentals', provider: 'Udemy', duration: '15 hours', level: 'Beginner', rating: 4.7, students: 80000, skill: 'Requirements Gathering', free: false, price: '$12.99', image: '📊', description: 'Learn core business analysis skills and techniques.' },
    { id: 'ba2', title: 'CBAP Certification Prep', provider: 'Udemy', duration: '20 hours', level: 'Advanced', rating: 4.6, students: 30000, skill: 'Documentation', free: false, price: '$14.99', image: '📜', description: 'Prepare for the CBAP business analysis certification.' },
    { id: 'ba3', title: 'Power BI for Business Analysts', provider: 'Udemy', duration: '12 hours', level: 'Beginner', rating: 4.8, students: 90000, skill: 'Data Analysis', free: false, price: '$12.99', image: '📈', description: 'Build powerful dashboards with Power BI.' },
  ],
  'Technical Writer': [
    { id: 'tw1', title: 'Technical Writing Fundamentals', provider: 'Coursera', duration: '12 hours', level: 'Beginner', rating: 4.6, students: 40000, skill: 'Technical Writing', free: true, price: 'Free', image: '✍️', description: 'Learn the fundamentals of technical writing.' },
    { id: 'tw2', title: 'API Documentation with Swagger', provider: 'Udemy', duration: '8 hours', level: 'Intermediate', rating: 4.7, students: 25000, skill: 'API Documentation', free: false, price: '$12.99', image: '📖', description: 'Document REST APIs professionally with Swagger/OpenAPI.' },
    { id: 'tw3', title: 'Docs as Code with Git & Markdown', provider: 'Udemy', duration: '6 hours', level: 'Beginner', rating: 4.5, students: 20000, skill: 'Markdown', free: false, price: '$9.99', image: '📝', description: 'Manage documentation like code using Git and Markdown.' },
  ],
  'Solutions Architect': [
    { id: 'sa1', title: 'AWS Solutions Architect Professional', provider: 'A Cloud Guru', duration: '60 hours', level: 'Advanced', rating: 4.8, students: 120000, skill: 'AWS', free: false, price: '$35/mo', image: '🏛️', description: 'Prepare for AWS Solutions Architect Professional exam.' },
    { id: 'sa2', title: 'System Design Interview Masterclass', provider: 'Udemy', duration: '20 hours', level: 'Advanced', rating: 4.9, students: 85000, skill: 'System Design', free: false, price: '$14.99', image: '🗺️', description: 'Master system design for large-scale applications.' },
    { id: 'sa3', title: 'Microservices Architecture', provider: 'Pluralsight', duration: '15 hours', level: 'Advanced', rating: 4.7, students: 50000, skill: 'Microservices', free: false, price: '$29/mo', image: '🔩', description: 'Design and implement microservices architectures.' },
  ],
  'AI Engineer': [
    { id: 'ai1', title: 'LangChain & LLM Apps Development', provider: 'Udemy', duration: '20 hours', level: 'Intermediate', rating: 4.8, students: 70000, skill: 'LLMs', free: false, price: '$14.99', image: '🤖', description: 'Build AI applications with LangChain and OpenAI.' },
    { id: 'ai2', title: 'Prompt Engineering for Developers', provider: 'DeepLearning.AI', duration: '8 hours', level: 'Beginner', rating: 4.9, students: 200000, skill: 'Prompt Engineering', free: true, price: 'Free', image: '💬', description: 'Official prompt engineering course by Andrew Ng.' },
    { id: 'ai3', title: 'Building RAG Applications', provider: 'Coursera', duration: '15 hours', level: 'Intermediate', rating: 4.7, students: 45000, skill: 'RAG', free: false, price: '$49/mo', image: '🔍', description: 'Build retrieval-augmented generation systems.' },
    { id: 'ai4', title: 'Vector Databases & Embeddings', provider: 'Udemy', duration: '10 hours', level: 'Intermediate', rating: 4.6, students: 30000, skill: 'Vector Databases', free: false, price: '$12.99', image: '🧮', description: 'Master vector databases for AI applications.' },
  ],
}

// Extract text from PDF using pdfjs
export async function extractTextFromPDF(file) {
  try {
    const pdfjsLib = await import('pdfjs-dist')
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`

    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    let fullText = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map(item => item.str).join(' ')
      fullText += pageText + ' '
    }

    return fullText.toLowerCase()
  } catch (err) {
    console.error('PDF extraction error:', err)
    return ''
  }
}

// Analyze resume text against job role
export function analyzeResume(resumeText, jobRole) {
  const text = resumeText.toLowerCase()
  const roleData = JOB_ROLES[jobRole]

  if (!roleData) return null

  // Check required skills
  const foundRequired = roleData.requiredSkills.filter(skill =>
    text.includes(skill.toLowerCase())
  )
  const missingRequired = roleData.requiredSkills.filter(skill =>
    !text.includes(skill.toLowerCase())
  )

  // Check nice-to-have skills
  const foundNiceToHave = roleData.niceToHave.filter(skill =>
    text.includes(skill.toLowerCase())
  )
  const missingNiceToHave = roleData.niceToHave.filter(skill =>
    !text.includes(skill.toLowerCase())
  )

  // Check experience keywords
  const experienceMatches = roleData.experienceKeywords.filter(kw =>
    text.includes(kw.toLowerCase())
  )

  // Extract years of experience (look for patterns like "2 years", "3+ years")
  const yearMatches = text.match(/(\d+)\+?\s*years?\s*(of\s*)?(experience|exp)/gi) || []
  const maxYears = yearMatches.reduce((max, match) => {
    const num = parseInt(match)
    return num > max ? num : max
  }, 0)

  // Calculate scores
  const requiredScore = (foundRequired.length / roleData.requiredSkills.length) * 60
  const niceToHaveScore = (foundNiceToHave.length / roleData.niceToHave.length) * 20
  const experienceScore = Math.min((experienceMatches.length / roleData.experienceKeywords.length) * 15, 15)
  const yearsScore = maxYears >= roleData.minExperienceYears ? 5 : (maxYears / Math.max(roleData.minExperienceYears, 1)) * 5

  const totalScore = Math.round(requiredScore + niceToHaveScore + experienceScore + yearsScore)
  const clampedScore = Math.min(Math.max(totalScore, 5), 98)

  // Determine eligibility
  const requiredCoverage = foundRequired.length / roleData.requiredSkills.length
  let eligibility = 'Low'
  let eligibilityColor = 'red'
  if (clampedScore >= 75) { eligibility = 'High'; eligibilityColor = 'green' }
  else if (clampedScore >= 50) { eligibility = 'Medium'; eligibilityColor = 'yellow' }
  else if (clampedScore >= 30) { eligibility = 'Low-Medium'; eligibilityColor = 'orange' }

  // Generate recommendations
  const recommendations = []
  if (missingRequired.length > 0) {
    recommendations.push(`Learn these critical skills: ${missingRequired.slice(0, 3).join(', ')}`)
  }
  if (maxYears < roleData.minExperienceYears) {
    recommendations.push(`Gain at least ${roleData.minExperienceYears} year(s) of relevant experience through projects or internships`)
  }
  if (foundNiceToHave.length < 3) {
    recommendations.push(`Add bonus skills like: ${missingNiceToHave.slice(0, 3).join(', ')}`)
  }
  if (experienceMatches.length < 2) {
    recommendations.push('Add more relevant keywords and project descriptions to your resume')
  }

  return {
    score: clampedScore,
    eligibility,
    eligibilityColor,
    jobRole,
    foundRequired,
    missingRequired,
    foundNiceToHave,
    missingNiceToHave,
    requiredCoverage: Math.round(requiredCoverage * 100),
    experienceYears: maxYears,
    recommendations,
    breakdown: {
      requiredSkills: Math.round(requiredScore),
      niceToHave: Math.round(niceToHaveScore),
      experience: Math.round(experienceScore + yearsScore),
    },
    courses: COURSES_DB[jobRole] || [],
    roleDescription: roleData.description,
  }
}
