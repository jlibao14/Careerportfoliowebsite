export interface Project {
  id: string;
  title: string;
  company: string;
  role: string;
  category: 'ERP' | 'Cloud' | 'Integration' | 'Governance' | 'Software' | 'IT Operations';
  description: string;
  problem: string;
  solution: string;
  techStack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'gto-erp-migration',
    title: 'Enterprise ERP Migration & Digital Transformation',
    company: 'GTO Trading Corporation',
    role: 'Head, IT Digital Transformation & ERP Program Director',
    category: 'ERP',
    description: 'Led comprehensive ERP system migration and digital transformation initiative',
    problem: 'Legacy systems causing operational inefficiencies and data silos across departments',
    solution: 'Architected and executed complete ERP migration with integrated business intelligence and automation workflows',
    techStack: ['SAP', 'Microsoft Dynamics', 'Power BI', 'Azure', 'API Integration'],
    metrics: [
      { label: 'Efficiency Gain', value: '40%' },
      { label: 'Cost Reduction', value: '30%' },
      { label: 'User Adoption', value: '95%' }
    ],
    featured: true
  },
  {
    id: 'retail-cloud-migration',
    title: 'Multi-Store Cloud Infrastructure',
    company: 'Chris Sports Inc.',
    role: 'IT Manager',
    category: 'Cloud',
    description: 'Migrated retail operations to cloud infrastructure across multiple locations',
    problem: 'On-premise infrastructure limiting scalability and causing maintenance overhead',
    solution: 'Designed and deployed cloud-native architecture with centralized management and automated backups',
    techStack: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CloudWatch'],
    metrics: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'Infrastructure Cost', value: '-45%' },
      { label: 'Deployment Speed', value: '10x' }
    ],
    featured: true
  },
  {
    id: 'devops-cicd-pipeline',
    title: 'Enterprise DevOps & CI/CD Pipeline',
    company: 'Lee Designs Inds.',
    role: 'IT Consultant - Solutions Architect',
    category: 'Integration',
    description: 'Established comprehensive DevOps practices and automated deployment pipelines',
    problem: 'Manual deployment processes causing delays and inconsistent releases',
    solution: 'Implemented end-to-end CI/CD pipeline with automated testing, security scanning, and zero-downtime deployments',
    techStack: ['Jenkins', 'GitLab CI', 'Docker', 'Ansible', 'SonarQube'],
    metrics: [
      { label: 'Deployment Time', value: '-80%' },
      { label: 'Bug Detection', value: '+60%' },
      { label: 'Release Frequency', value: '5x' }
    ],
    featured: true
  },
  {
    id: 'fintech-security-compliance',
    title: 'Fintech Security & Compliance Framework',
    company: 'Ventaja International Corp./PAYREMIT',
    role: 'IT Consultant - Engineering Head',
    category: 'Governance',
    description: 'Developed comprehensive security and compliance framework for fintech operations',
    problem: 'Regulatory compliance requirements and security vulnerabilities across payment systems',
    solution: 'Architected multi-layered security framework with automated compliance monitoring and audit trails',
    techStack: ['ISO 27001', 'PCI-DSS', 'SIEM', 'Vault', 'OAuth 2.0'],
    metrics: [
      { label: 'Security Score', value: '98%' },
      { label: 'Compliance Rate', value: '100%' },
      { label: 'Incident Response', value: '-70%' }
    ],
    featured: true
  },
  {
    id: 'bpo-infrastructure',
    title: 'BPO Infrastructure Scaling',
    company: 'VXI Global Solutions',
    role: 'Senior Dev & IT Ops Engineer',
    category: 'Cloud',
    description: 'Scaled infrastructure to support 1000+ concurrent users across multiple sites',
    problem: 'Rapidly growing workforce exceeding infrastructure capacity',
    solution: 'Designed scalable cloud infrastructure with load balancing and disaster recovery',
    techStack: ['Azure', 'Load Balancers', 'Redis', 'PostgreSQL', 'Monitoring Stack'],
    metrics: [
      { label: 'User Capacity', value: '+200%' },
      { label: 'Response Time', value: '-50%' },
      { label: 'Availability', value: '99.95%' }
    ]
  },
  {
    id: 'banking-integration',
    title: 'Banking Systems Integration',
    company: 'Main Hardware Inc.',
    role: 'Senior Software Engineer',
    category: 'Integration',
    description: 'Integrated banking systems with BSP/JP Morgan/Emerson platforms',
    problem: 'Disparate banking systems requiring manual reconciliation',
    solution: 'Built secure API integration layer with real-time transaction processing',
    techStack: ['REST API', 'SOAP', 'SSL/TLS', 'Message Queues', 'SQL Server'],
    metrics: [
      { label: 'Transaction Speed', value: '100x' },
      { label: 'Manual Work', value: '-90%' },
      { label: 'Accuracy', value: '99.99%' }
    ]
  },
  {
    id: 'data-privacy-compliance',
    title: 'Data Privacy Act Compliance Program',
    company: 'Multiple Organizations',
    role: 'IT Consultant',
    category: 'Governance',
    description: 'Implemented Data Privacy Act compliance across multiple organizations',
    problem: 'Organizations lacking formal data privacy frameworks and processes',
    solution: 'Developed comprehensive compliance program with policies, procedures, and training',
    techStack: ['DPA Compliance', 'Privacy Policies', 'Data Mapping', 'Encryption', 'Access Controls'],
    metrics: [
      { label: 'Compliance Score', value: '100%' },
      { label: 'Data Breaches', value: '0' },
      { label: 'Staff Training', value: '100%' }
    ]
  },
  {
    id: 'ai-chatbot-integration',
    title: 'AI-Powered Customer Service Platform',
    company: 'JML Freelance Consulting',
    role: 'IT Consultant - Solutions Architect',
    category: 'Software',
    description: 'Developed AI chatbot with natural language processing for customer support',
    problem: 'High volume of repetitive customer inquiries overwhelming support team',
    solution: 'Built intelligent chatbot with NLP, knowledge base, and escalation workflows',
    techStack: ['OpenAI GPT', 'Python', 'FastAPI', 'PostgreSQL', 'React'],
    metrics: [
      { label: 'Ticket Reduction', value: '60%' },
      { label: 'Response Time', value: '-85%' },
      { label: 'Customer Satisfaction', value: '92%' }
    ]
  },
  {
    id: 'itsm-itil-operations',
    title: 'IT Operations Transformation & ITSM Rollout',
    company: 'GTO Trading Corporation',
    role: 'Head, IT Digital Transformation & ERP Program Director',
    category: 'IT Operations',
    description: 'Stood up an ITIL v4-aligned IT Operations function and ITSM platform across the enterprise',
    problem: 'Ad-hoc IT support with no service catalog, unclear SLAs, and reactive incident handling across business units',
    solution: 'Established service desk, ITIL processes (Incident, Problem, Change, Release), CMDB, and SLA governance with executive KPI reporting',
    techStack: ['ITIL v4', 'Jira Service Management', 'ServiceNow', 'CMDB', 'Confluence', 'Power BI'],
    metrics: [
      { label: 'MTTR Reduction', value: '-55%' },
      { label: 'First-Call Resolution', value: '82%' },
      { label: 'SLA Compliance', value: '98%' }
    ],
    featured: true
  },
  {
    id: 'noc-observability-platform',
    title: '24x7 NOC & Observability Platform',
    company: 'VXI Global Solutions',
    role: 'Senior DevOps Engineer / Team Manager',
    category: 'IT Operations',
    description: 'Built a 24x7 Network Operations Center with end-to-end observability and SRE practices',
    problem: 'Blind spots across global production systems with slow incident detection and noisy alerts',
    solution: 'Deployed unified observability stack (metrics, logs, traces), defined SLIs/SLOs, and operationalized on-call rotations and runbooks',
    techStack: ['Prometheus', 'Grafana', 'ELK Stack', 'CloudWatch', 'PagerDuty', 'Ansible'],
    metrics: [
      { label: 'MTTD', value: '< 2 min' },
      { label: 'Alert Noise', value: '-70%' },
      { label: 'Uptime', value: '99.95%' }
    ]
  },
  {
    id: 'bcp-drp-program',
    title: 'Business Continuity & Disaster Recovery Program',
    company: 'Ventaja International Corp./PAYREMIT',
    role: 'Head of Software Development & Technical Engineering',
    category: 'IT Operations',
    description: 'Designed and tested enterprise BCP/DRP for fintech operations spanning payment, payroll, and POS systems',
    problem: 'No formal recovery strategy for mission-critical fintech workloads with regulatory exposure',
    solution: 'Defined RTO/RPO targets, implemented multi-region failover, automated backups, and conducted live DR drills',
    techStack: ['AWS Multi-AZ', 'Docker', 'Veeam', 'Terraform', 'Runbooks', 'BCP/DRP'],
    metrics: [
      { label: 'RTO Achieved', value: '< 1 hr' },
      { label: 'RPO Achieved', value: '< 15 min' },
      { label: 'DR Drill Success', value: '100%' }
    ]
  },
  {
    id: 'microservices-architecture',
    title: 'Microservices Architecture Migration',
    company: 'Systems Variable Technicom',
    role: 'MIS Analyst',
    category: 'Software',
    description: 'Migrated monolithic application to microservices architecture',
    problem: 'Monolithic application hindering development speed and scalability',
    solution: 'Decomposed monolith into microservices with API gateway and service mesh',
    techStack: ['Node.js', 'Docker', 'Kubernetes', 'Kong API Gateway', 'MongoDB'],
    metrics: [
      { label: 'Deployment Speed', value: '8x' },
      { label: 'Scalability', value: '+300%' },
      { label: 'Development Velocity', value: '+150%' }
    ]
  }
];
