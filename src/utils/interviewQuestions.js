export const INTERVIEW_QUESTIONS = {
  'Frontend Developer': {
    technical: [
      { q: 'Explain the difference between `let`, `const`, and `var` in JavaScript.', hint: 'Think about scope, hoisting, and mutability.', ideal: ['block scope', 'function scope', 'hoisting', 'const immutable', 'temporal dead zone'] },
      { q: 'What is the Virtual DOM in React and why does it improve performance?', hint: 'Compare with real DOM manipulation.', ideal: ['virtual dom', 'diffing', 'reconciliation', 'batch updates', 'real dom expensive'] },
      { q: 'Explain CSS Flexbox vs CSS Grid — when would you use each?', hint: 'Think about 1D vs 2D layouts.', ideal: ['flexbox one-dimensional', 'grid two-dimensional', 'row column', 'alignment', 'responsive'] },
      { q: 'What are React Hooks? Name at least 3 and explain their use.', hint: 'useState, useEffect, useContext, useMemo...', ideal: ['usestate', 'useeffect', 'usecontext', 'side effects', 'state management'] },
      { q: 'How does event delegation work in JavaScript?', hint: 'Think about bubbling and capturing.', ideal: ['event bubbling', 'parent element', 'target', 'performance', 'dynamic elements'] },
      { q: 'What is the difference between `==` and `===` in JavaScript?', hint: 'Type coercion is key here.', ideal: ['type coercion', 'strict equality', 'loose equality', 'type conversion'] },
      { q: 'Explain what a closure is in JavaScript with an example.', hint: 'Think about inner functions accessing outer scope.', ideal: ['inner function', 'outer scope', 'lexical environment', 'encapsulation', 'private variables'] },
    ],
    behavioral: [
      { q: 'Tell me about a challenging UI bug you fixed. What was your debugging process?', hint: 'Use the STAR method: Situation, Task, Action, Result.', ideal: ['debugging', 'console', 'systematic', 'solution', 'learned'] },
      { q: 'How do you ensure your code is accessible to users with disabilities?', hint: 'Think about ARIA, semantic HTML, keyboard navigation.', ideal: ['aria', 'semantic html', 'keyboard', 'screen reader', 'wcag', 'alt text'] },
      { q: 'Describe your approach to code reviews — both giving and receiving feedback.', hint: 'Focus on collaboration and growth mindset.', ideal: ['constructive', 'learning', 'team', 'standards', 'improvement'] },
    ],
  },
  'Backend Developer': {
    technical: [
      { q: 'What is the difference between SQL and NoSQL databases? When would you choose each?', hint: 'Think about structure, scalability, and use cases.', ideal: ['structured', 'schema', 'scalability', 'relational', 'document', 'use case'] },
      { q: 'Explain RESTful API design principles. What makes an API truly RESTful?', hint: 'Think about HTTP methods, statelessness, resources.', ideal: ['stateless', 'http methods', 'resources', 'uniform interface', 'get post put delete'] },
      { q: 'What is database indexing and how does it improve query performance?', hint: 'Think about B-trees and trade-offs.', ideal: ['index', 'query speed', 'b-tree', 'write overhead', 'primary key', 'search'] },
      { q: 'Explain the concept of middleware in Node.js/Express.', hint: 'Think about the request-response cycle.', ideal: ['request', 'response', 'next', 'pipeline', 'authentication', 'logging'] },
      { q: 'What are the SOLID principles in software design?', hint: 'Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion.', ideal: ['single responsibility', 'open closed', 'liskov', 'interface', 'dependency'] },
      { q: 'How would you handle authentication and authorization in a REST API?', hint: 'Think about JWT, OAuth, sessions.', ideal: ['jwt', 'token', 'oauth', 'authorization header', 'refresh token', 'bcrypt'] },
      { q: 'What is caching and what strategies would you use to improve API performance?', hint: 'Redis, CDN, HTTP caching headers...', ideal: ['redis', 'cache', 'ttl', 'invalidation', 'performance', 'cdn'] },
    ],
    behavioral: [
      { q: 'Describe a time you had to optimize a slow database query. What was your approach?', hint: 'STAR method — be specific about the improvement.', ideal: ['query', 'index', 'explain', 'optimization', 'performance', 'result'] },
      { q: 'How do you approach designing a new API endpoint from scratch?', hint: 'Think about requirements, design, documentation.', ideal: ['requirements', 'design', 'documentation', 'versioning', 'testing', 'security'] },
      { q: 'Tell me about a time you had to work with a legacy codebase. How did you handle it?', hint: 'Focus on your strategy and what you learned.', ideal: ['documentation', 'tests', 'refactor', 'incremental', 'understand', 'team'] },
    ],
  },
  'Full Stack Developer': {
    technical: [
      { q: 'Explain the MERN stack and how the components interact with each other.', hint: 'MongoDB, Express, React, Node — trace a request.', ideal: ['mongodb', 'express', 'react', 'node', 'api', 'database', 'frontend'] },
      { q: 'What is CORS and how do you handle it in a full-stack application?', hint: 'Think about browser security and server headers.', ideal: ['cross origin', 'headers', 'preflight', 'allow origin', 'security', 'server'] },
      { q: 'How would you implement user authentication in a full-stack app?', hint: 'Think end-to-end: frontend form → API → database.', ideal: ['jwt', 'bcrypt', 'session', 'token', 'secure', 'httponly', 'refresh'] },
      { q: 'What is server-side rendering (SSR) vs client-side rendering (CSR)? When to use each?', hint: 'Think about SEO, performance, and user experience.', ideal: ['seo', 'initial load', 'hydration', 'next.js', 'performance', 'ttfb'] },
      { q: 'Explain how you would structure a scalable full-stack project.', hint: 'Think about folder structure, separation of concerns.', ideal: ['separation', 'modules', 'routes', 'controllers', 'models', 'components', 'services'] },
    ],
    behavioral: [
      { q: 'Describe a full-stack feature you built end-to-end. Walk me through your process.', hint: 'Cover design, implementation, testing, deployment.', ideal: ['design', 'api', 'frontend', 'testing', 'deployment', 'challenges'] },
      { q: 'How do you decide when to use a third-party library vs building something yourself?', hint: 'Think about trade-offs: time, maintenance, control.', ideal: ['trade-off', 'maintenance', 'bundle size', 'time', 'control', 'community'] },
    ],
  },
  'Data Scientist': {
    technical: [
      { q: 'Explain the bias-variance tradeoff in machine learning.', hint: 'Think about underfitting vs overfitting.', ideal: ['bias', 'variance', 'overfitting', 'underfitting', 'complexity', 'generalization'] },
      { q: 'What is the difference between supervised, unsupervised, and reinforcement learning?', hint: 'Think about labeled data and feedback.', ideal: ['labeled', 'unlabeled', 'reward', 'classification', 'clustering', 'agent'] },
      { q: 'How would you handle missing data in a dataset?', hint: 'Think about imputation, removal, and domain knowledge.', ideal: ['imputation', 'mean median', 'drop', 'domain', 'pattern', 'mcar mar mnar'] },
      { q: 'Explain cross-validation and why it is important.', hint: 'Think about model evaluation and generalization.', ideal: ['k-fold', 'train test', 'generalization', 'overfitting', 'evaluation', 'split'] },
      { q: 'What is regularization? Explain L1 vs L2.', hint: 'Think about preventing overfitting by penalizing complexity.', ideal: ['l1 lasso', 'l2 ridge', 'penalty', 'overfitting', 'sparse', 'coefficients'] },
      { q: 'How do you evaluate a classification model beyond accuracy?', hint: 'Think about imbalanced datasets.', ideal: ['precision', 'recall', 'f1', 'roc auc', 'confusion matrix', 'imbalanced'] },
    ],
    behavioral: [
      { q: 'Describe a data science project you are proud of. What was the business impact?', hint: 'Quantify the impact if possible.', ideal: ['problem', 'data', 'model', 'result', 'impact', 'business', 'metric'] },
      { q: 'How do you communicate complex model results to non-technical stakeholders?', hint: 'Think about visualization and storytelling.', ideal: ['visualization', 'simple', 'business terms', 'story', 'dashboard', 'avoid jargon'] },
    ],
  },
  'Data Analyst': {
    technical: [
      { q: 'Write a SQL query to find the top 5 customers by total purchase amount.', hint: 'Think about GROUP BY, ORDER BY, LIMIT.', ideal: ['group by', 'sum', 'order by', 'limit', 'desc', 'aggregate'] },
      { q: 'What is the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN?', hint: 'Think about which rows are included from each table.', ideal: ['inner join', 'left join', 'matching rows', 'null', 'all rows', 'outer'] },
      { q: 'How would you detect and handle outliers in a dataset?', hint: 'Think about IQR, Z-score, visualization.', ideal: ['iqr', 'z-score', 'boxplot', 'standard deviation', 'domain knowledge', 'remove cap'] },
      { q: 'Explain the difference between a measure and a dimension in data analysis.', hint: 'Think about Tableau/Power BI concepts.', ideal: ['measure numeric', 'dimension categorical', 'aggregate', 'group', 'fact', 'attribute'] },
      { q: 'What is A/B testing and how would you design one?', hint: 'Think about hypothesis, control, treatment, significance.', ideal: ['hypothesis', 'control group', 'treatment', 'statistical significance', 'p-value', 'sample size'] },
    ],
    behavioral: [
      { q: 'Tell me about a time your data analysis led to a significant business decision.', hint: 'Quantify the outcome.', ideal: ['insight', 'decision', 'impact', 'data', 'recommendation', 'result'] },
      { q: 'How do you ensure data quality in your analysis?', hint: 'Think about validation, cleaning, documentation.', ideal: ['validation', 'cleaning', 'null check', 'duplicates', 'source', 'documentation'] },
    ],
  },
  'DevOps Engineer': {
    technical: [
      { q: 'Explain the CI/CD pipeline. What are the key stages?', hint: 'Think about build, test, deploy stages.', ideal: ['build', 'test', 'deploy', 'integration', 'automation', 'pipeline', 'artifact'] },
      { q: 'What is the difference between Docker containers and virtual machines?', hint: 'Think about isolation, overhead, and portability.', ideal: ['kernel', 'lightweight', 'isolation', 'hypervisor', 'image', 'overhead', 'portability'] },
      { q: 'Explain Kubernetes architecture — what are pods, nodes, and clusters?', hint: 'Think about the control plane and worker nodes.', ideal: ['pod', 'node', 'cluster', 'control plane', 'scheduler', 'kubelet', 'service'] },
      { q: 'What is Infrastructure as Code (IaC)? Name some tools.', hint: 'Think about Terraform, Ansible, CloudFormation.', ideal: ['terraform', 'ansible', 'cloudformation', 'version control', 'reproducible', 'automation'] },
      { q: 'How would you monitor a production application? What metrics matter most?', hint: 'Think about the four golden signals.', ideal: ['latency', 'traffic', 'errors', 'saturation', 'prometheus', 'grafana', 'alerting'] },
    ],
    behavioral: [
      { q: 'Describe a production incident you handled. What was your incident response process?', hint: 'Think about detection, mitigation, root cause, prevention.', ideal: ['detect', 'mitigate', 'root cause', 'postmortem', 'prevention', 'communication'] },
      { q: 'How do you balance speed of deployment with stability and reliability?', hint: 'Think about feature flags, canary deployments, rollbacks.', ideal: ['feature flags', 'canary', 'rollback', 'testing', 'monitoring', 'gradual'] },
    ],
  },
  'UI/UX Designer': {
    technical: [
      { q: 'Walk me through your design process from brief to final deliverable.', hint: 'Think about research, ideation, prototyping, testing.', ideal: ['research', 'wireframe', 'prototype', 'user testing', 'iterate', 'handoff'] },
      { q: 'What is the difference between UX and UI design?', hint: 'Think about experience vs interface.', ideal: ['user experience', 'user interface', 'usability', 'visual', 'interaction', 'research'] },
      { q: 'How do you conduct user research? What methods do you use?', hint: 'Think about interviews, surveys, usability tests.', ideal: ['interviews', 'surveys', 'usability testing', 'personas', 'empathy map', 'observation'] },
      { q: 'Explain the principles of good typography in UI design.', hint: 'Think about hierarchy, readability, contrast.', ideal: ['hierarchy', 'readability', 'contrast', 'line height', 'font pairing', 'scale'] },
      { q: 'What is a design system and why is it important?', hint: 'Think about consistency and scalability.', ideal: ['consistency', 'components', 'tokens', 'documentation', 'scalable', 'team'] },
    ],
    behavioral: [
      { q: 'Tell me about a time user research changed your design direction significantly.', hint: 'Show how you listen to users over assumptions.', ideal: ['research', 'insight', 'changed', 'user feedback', 'iterate', 'result'] },
      { q: 'How do you handle disagreements with developers about design implementation?', hint: 'Think about collaboration and compromise.', ideal: ['collaborate', 'explain', 'compromise', 'constraints', 'priority', 'relationship'] },
    ],
  },
  'Machine Learning Engineer': {
    technical: [
      { q: 'Explain the difference between batch learning and online learning.', hint: 'Think about when the model updates.', ideal: ['batch', 'online', 'incremental', 'real-time', 'data stream', 'retrain'] },
      { q: 'What is gradient descent and how does it work?', hint: 'Think about loss functions and optimization.', ideal: ['loss function', 'gradient', 'learning rate', 'minimize', 'weights', 'backpropagation'] },
      { q: 'How do you deploy a machine learning model to production?', hint: 'Think about APIs, containers, monitoring.', ideal: ['api', 'docker', 'flask fastapi', 'monitoring', 'versioning', 'drift', 'mlops'] },
      { q: 'What is feature engineering and why is it important?', hint: 'Think about transforming raw data into useful features.', ideal: ['transform', 'normalize', 'encode', 'create features', 'domain knowledge', 'model performance'] },
      { q: 'Explain the attention mechanism in transformers.', hint: 'Think about self-attention and query-key-value.', ideal: ['attention', 'query key value', 'self-attention', 'weights', 'context', 'transformer'] },
    ],
    behavioral: [
      { q: 'Describe a machine learning project where the model did not perform as expected. How did you debug it?', hint: 'Think about data, features, model choice, hyperparameters.', ideal: ['data quality', 'features', 'hyperparameter', 'baseline', 'debug', 'iterate'] },
      { q: 'How do you handle model drift in production?', hint: 'Think about monitoring, retraining, alerting.', ideal: ['monitoring', 'drift detection', 'retrain', 'alert', 'data distribution', 'schedule'] },
    ],
  },
  'Cybersecurity Analyst': {
    technical: [
      { q: 'What is the difference between symmetric and asymmetric encryption?', hint: 'Think about key pairs and use cases.', ideal: ['symmetric same key', 'asymmetric public private', 'aes', 'rsa', 'speed', 'key exchange'] },
      { q: 'Explain the OWASP Top 10 vulnerabilities. Name at least 5.', hint: 'Think about injection, XSS, broken auth...', ideal: ['injection', 'xss', 'broken authentication', 'idor', 'security misconfiguration', 'csrf'] },
      { q: 'What is a man-in-the-middle attack and how do you prevent it?', hint: 'Think about TLS, certificate pinning.', ideal: ['intercept', 'tls ssl', 'certificate', 'https', 'pinning', 'encryption'] },
      { q: 'Explain the difference between IDS and IPS.', hint: 'Think about detection vs prevention.', ideal: ['intrusion detection', 'intrusion prevention', 'passive active', 'alert block', 'network'] },
      { q: 'What is a zero-day vulnerability?', hint: 'Think about unknown exploits and patch timelines.', ideal: ['unknown', 'unpatched', 'exploit', 'vendor', 'disclosure', 'patch'] },
    ],
    behavioral: [
      { q: 'Describe how you would respond to a ransomware attack on a company network.', hint: 'Think about containment, eradication, recovery.', ideal: ['isolate', 'backup', 'report', 'forensics', 'restore', 'prevent', 'communicate'] },
      { q: 'How do you stay up to date with the latest cybersecurity threats?', hint: 'Think about CVEs, threat intelligence, communities.', ideal: ['cve', 'threat intel', 'blogs', 'certifications', 'community', 'practice'] },
    ],
  },
  'Product Manager': {
    technical: [
      { q: 'How do you prioritize features in a product backlog?', hint: 'Think about frameworks like RICE, MoSCoW, Kano.', ideal: ['rice', 'moscow', 'impact', 'effort', 'user value', 'business value', 'prioritization'] },
      { q: 'What metrics would you use to measure the success of a new feature?', hint: 'Think about leading and lagging indicators.', ideal: ['dau mau', 'retention', 'conversion', 'nps', 'engagement', 'revenue', 'okr'] },
      { q: 'Explain the difference between a product roadmap and a product backlog.', hint: 'Think about strategy vs execution.', ideal: ['roadmap strategic', 'backlog tactical', 'timeline', 'themes', 'stories', 'planning'] },
      { q: 'How would you define and write a good user story?', hint: 'Think about the "As a... I want... So that..." format.', ideal: ['as a user', 'i want', 'so that', 'acceptance criteria', 'value', 'testable'] },
      { q: 'What is product-market fit and how do you measure it?', hint: 'Think about Sean Ellis test, retention curves.', ideal: ['retention', 'nps', 'sean ellis', 'very disappointed', 'organic growth', 'churn'] },
    ],
    behavioral: [
      { q: 'Tell me about a product decision you made with limited data. How did you approach it?', hint: 'Think about assumptions, experiments, learning.', ideal: ['assumption', 'hypothesis', 'experiment', 'data', 'risk', 'decision', 'learn'] },
      { q: 'How do you handle conflicting priorities from different stakeholders?', hint: 'Think about alignment, data, and communication.', ideal: ['align', 'data', 'communicate', 'trade-off', 'strategy', 'relationship', 'transparent'] },
    ],
  },
}

// Generic questions for custom job roles
export const GENERIC_QUESTIONS = {
  technical: [
    { q: 'What are the core technical skills required for your target role, and how have you developed them?', hint: 'Be specific about tools, technologies, and projects.', ideal: ['skills', 'experience', 'projects', 'learning', 'applied', 'results'] },
    { q: 'Describe a complex technical problem you solved. What was your approach?', hint: 'Use STAR: Situation, Task, Action, Result.', ideal: ['problem', 'approach', 'solution', 'result', 'technical', 'systematic'] },
    { q: 'How do you stay current with new technologies and industry trends in your field?', hint: 'Think about learning habits and resources.', ideal: ['courses', 'blogs', 'community', 'practice', 'projects', 'continuous learning'] },
    { q: 'What tools and technologies do you use daily in your work?', hint: 'Be specific and explain why you prefer them.', ideal: ['tools', 'why', 'productivity', 'workflow', 'specific', 'experience'] },
    { q: 'Explain a concept from your field to someone with no technical background.', hint: 'Test your ability to simplify complex ideas.', ideal: ['simple', 'analogy', 'clear', 'no jargon', 'example', 'understand'] },
  ],
  behavioral: [
    { q: 'Tell me about yourself and why you are interested in this role.', hint: 'Keep it professional: background, skills, motivation.', ideal: ['background', 'skills', 'motivation', 'fit', 'goal', 'value'] },
    { q: 'Describe a time you had to learn something new quickly under pressure.', hint: 'Show adaptability and learning agility.', ideal: ['learn', 'fast', 'pressure', 'adapt', 'result', 'method'] },
    { q: 'How do you handle constructive criticism of your work?', hint: 'Show growth mindset and professionalism.', ideal: ['listen', 'reflect', 'improve', 'growth', 'professional', 'feedback'] },
    { q: 'Tell me about a time you worked in a team to achieve a difficult goal.', hint: 'Highlight collaboration and your specific contribution.', ideal: ['team', 'collaborate', 'role', 'communication', 'result', 'contribution'] },
    { q: 'Where do you see yourself in 3-5 years?', hint: 'Align your goals with the role and company growth.', ideal: ['growth', 'skills', 'leadership', 'contribution', 'aligned', 'realistic'] },
  ],
}

export function getQuestionsForRole(jobRole) {
  const roleQuestions = INTERVIEW_QUESTIONS[jobRole]
  if (roleQuestions) return roleQuestions
  return GENERIC_QUESTIONS
}

export function scoreAnswer(answer, idealKeywords) {
  if (!answer || answer.trim().length < 10) return 0
  const lower = answer.toLowerCase()
  const matched = idealKeywords.filter(kw => lower.includes(kw.toLowerCase()))
  const keywordScore = Math.min((matched.length / idealKeywords.length) * 70, 70)
  const lengthScore = Math.min((answer.trim().split(/\s+/).length / 80) * 20, 20)
  const structureScore = (answer.includes('.') || answer.includes(',')) ? 10 : 5
  return Math.round(keywordScore + lengthScore + structureScore)
}
