import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../app/components/ui/card';
import {
  Building2,
  Cloud,
  Code,
  Shield,
  Server,
  Database,
  GitBranch,
  Lock,
  Users,
  TrendingUp,
  Workflow,
  FileCheck,
  LifeBuoy,
  Activity,
  Cpu,
  Container
} from 'lucide-react';

export function Capabilities() {
  const capabilities = [
    {
      icon: Building2,
      title: 'ERP & Digital Transformation',
      description: 'Leading enterprise-wide digital initiatives',
      details: [
        'Odoo Enterprise, SAP, NetSuite and other ERP implementation and customization programs',
        'Business process re-engineering and optimization',
        'Change management and user adoption strategies',
        'Data migration and system integration',
        'ROI analysis and business value realization'
      ]
    },
    {
      icon: Code,
      title: 'DevOps & Software Engineering',
      description: 'Building modern application architectures',
      details: [
        'CI/CD pipeline design and implementation',
        'Infrastructure as Code (Terraform, Ansible)',
        'Containerization and orchestration (Docker, Kubernetes)',
        'Microservices architecture design',
        'Automated testing and quality assurance'
      ]
    },
    {
      icon: Cloud,
      title: 'Cloud & Infrastructure',
      description: 'Architecting scalable cloud solutions',
      details: [
        'AWS and Azure cloud architecture',
        'Hybrid cloud and multi-cloud strategies',
        'Cloud migration and modernization',
        'Cost optimization and resource management',
        'High availability and disaster recovery'
      ]
    },
    {
      icon: Workflow,
      title: 'Systems Integration & Architecture',
      description: 'Connecting enterprise systems seamlessly',
      details: [
        'API design and integration (REST, GraphQL, SOAP)',
        'Enterprise Service Bus (ESB) architecture',
        'Real-time data synchronization',
        'Legacy system modernization',
        'Event-driven architecture'
      ]
    },
    {
      icon: Shield,
      title: 'IT Governance & Compliance',
      description: 'Establishing security frameworks',
      details: [
        'ISO 27001, PCI-DSS, and industry standards',
        'Data Privacy Act compliance',
        'Security policy development and enforcement',
        'Risk assessment and mitigation',
        'Audit preparation and management'
      ]
    },
    {
      icon: LifeBuoy,
      title: 'IT Operations & Service Management (ITSM)',
      description: 'Leading IT Operations with ITIL-aligned service delivery',
      details: [
        'ITIL v4 framework – Incident, Problem, Change, and Release Management',
        'Service Desk operations, SLA/OLA definition and KPI governance',
        'Configuration Management Database (CMDB) and asset lifecycle management',
        'NOC/SOC operations, 24x7 monitoring, and on-call escalation models',
        'ITSM tooling: ServiceNow, Jira Service Management, Freshservice, Zendesk',
        'Business Continuity, Disaster Recovery (BCP/DRP), and RTO/RPO planning'
      ]
    },
    {
      icon: Activity,
      title: 'Observability & SRE Practices',
      description: 'Site reliability, monitoring, and proactive operations',
      details: [
        'End-to-end observability: metrics, logs, traces (Prometheus, Grafana, ELK, Datadog)',
        'SRE principles – SLIs, SLOs, error budgets, and toil reduction',
        'APM and synthetic monitoring (New Relic, AppDynamics, CloudWatch)',
        'Capacity planning, performance tuning, and root-cause analysis (RCA)',
        'Automated remediation, runbooks, and chaos engineering exposure'
      ]
    },
    {
      icon: Users,
      title: 'Program & Vendor Management',
      description: 'Driving strategic initiatives',
      details: [
        'Multi-project portfolio management',
        'Budget planning and cost control',
        'Vendor selection and contract negotiation',
        'Stakeholder communication and reporting',
        'Agile and waterfall methodologies'
      ]
    }
  ];

  const tools = [
    { icon: GitBranch, name: 'Version Control & CI/CD', tools: 'Git, GitHub Actions, GitLab CI, Jenkins, Argo CD' },
    { icon: Server, name: 'Cloud Platforms', tools: 'AWS, Azure, GCP, DigitalOcean' },
    { icon: Container, name: 'Containers & Orchestration', tools: 'Docker, Kubernetes, Helm, Rancher' },
    { icon: Workflow, name: 'IaC & Automation', tools: 'Terraform, Ansible, CloudFormation, Pulumi' },
    { icon: Database, name: 'Databases', tools: 'PostgreSQL, MySQL, MongoDB, Redis, MS SQL' },
    { icon: Lock, name: 'Security & IAM', tools: 'HashiCorp Vault, SIEM, Okta, SSL/TLS, OAuth 2.0' },
    { icon: FileCheck, name: 'Observability', tools: 'Prometheus, Grafana, ELK, Datadog, CloudWatch' },
    { icon: LifeBuoy, name: 'ITSM Platforms', tools: 'ServiceNow, Jira Service Management, Freshservice' },
    { icon: Cpu, name: 'ERP & Business Apps', tools: 'Odoo Enterprise, SAP, NetSuite, MS Dynamics' },
    { icon: TrendingUp, name: 'BI & Analytics', tools: 'Power BI, Tableau, Looker, Metabase' },
    { icon: Code, name: 'Languages & Frameworks', tools: 'Python, Node.js, TypeScript, React, FastAPI' },
    { icon: Building2, name: 'Frameworks & Standards', tools: 'ITIL v4, COBIT, ISO 27001, PCI-DSS, NIST' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0e27] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Capabilities
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive technology leadership across enterprise transformation,
            cloud infrastructure, and strategic program management
          </p>
        </motion.div>

        {/* Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-[#0f1629] border-[#1a1f3a] h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <capability.icon className="h-8 w-8 text-[#d4af37]" />
                    <CardTitle className="text-white">{capability.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">
                    {capability.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {capability.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                        <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full mt-1.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tools & Technologies */}
        <section>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Tools & Technologies
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experienced with modern technology stacks and enterprise tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-[#0f1629] border-[#1a1f3a]">
                  <CardContent className="pt-6 text-center">
                    <tool.icon className="h-8 w-8 text-[#d4af37] mx-auto mb-3" />
                    <h3 className="font-semibold text-white mb-1">{tool.name}</h3>
                    <p className="text-sm text-gray-400">{tool.tools}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
