import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../app/components/ui/card';
import { Briefcase, Award, GraduationCap } from 'lucide-react';

export function About() {
  const careerTimeline = [
    {
      period: 'Ongoing',
      title: 'AI Developer | Project Manager | Trader',
      company: 'JML Freelance Consulting (Self-Employed)',
      description: 'Designs and builds digital products tailored for local SMEs, driving operational efficiency and growth. Guides start-up companies through AI modernization initiatives, enabling scalable adoption of emerging technologies. Delivers technical consultancy services providing strategic insights and implementation support. Develops and optimizes AI-driven trading bots (Expert Advisors) engineered to align with London and New York market sessions for enhanced performance.'
    },
    {
      period: 'Nov 2025 - Mar 2026',
      title: 'Head of IT & Digital Transformation and ERP Program Director',
      company: 'GTO Trading Corporation',
      description: 'Defined and executed enterprise-wide IT and digital transformation strategy. Led end-to-end ERP program across Finance, Supply Chain, Sales, and Operations. Served on Executive Steering Committee, establishing governance frameworks, KPIs, and risk management. Successfully transformed fragmented systems into a unified ERP-driven enterprise platform.'
    },
    {
      period: 'Jul 2025 - Oct 2025',
      title: 'IT Manager / Vendor Collaboration Lead',
      company: 'Chris Sports, Inc.',
      description: 'Directed IT strategy and digital transformation roadmap. Led implementation and optimization of Odoo ERP across retail, warehouse, and service operations. Managed cloud platforms (SaaS/PaaS), cybersecurity frameworks, and automation initiatives. Improved system uptime and operational efficiency.'
    },
    {
      period: 'Apr 2025 - Jul 2025',
      title: 'Solutions Architect — IT Consultant (Contract)',
      company: 'LEE Designs Industries, Inc.',
      description: 'Re-architected IT infrastructure, security compliance, and governance processes; deployed application servers, Active Directory, firewall services, and group policy controls. Drafted business and systems proposals and led vendor selection alongside company ownership; built and onboarded the technical team. Impact: Established a reliable, policy-governed IT and security infrastructure aligned to current best practices.'
    },
    {
      period: 'Jul 2023 - Dec 2023',
      title: 'Head of Software Development & Technical Engineering',
      company: 'Ventaja International Corporation – PAYREMIT (Fintech)',
      description: 'Led team of 17 engineers, establishing departmental structure, governance, and security compliance architecture. Directed infrastructure buildout and containerization (Docker). Delivered multiple enterprise systems including payroll and POS deployments across airport terminals.'
    },
    {
      period: 'Jan 2016 - Dec 2021',
      title: 'DevOps Engineer → Senior DevOps Engineer → Team Manager',
      company: 'VXI Global Solutions, LLC (BPO)',
      description: 'Led DevOps team through AWS cloud migration (RDS, CloudWatch) and established CI/CD pipelines using Jenkins and GitLab. Managed production monitoring, system uptime, and Agile delivery across global programs. Scaled DevOps capability through process automation and engineering standardization.'
    },
    {
      period: 'May 2013 - Jan 2016',
      title: 'MIS Analyst / Senior Software Engineer',
      company: 'VXI Global Solutions, LLC',
      description: 'Developed enterprise tools with global impact, specializing in software engineering, database systems, and HR technology solutions. Promoted to DevOps Team Manager based on performance.'
    },
    {
      period: 'Jan 2013 - May 2013',
      title: 'Head – Testing & Commissioning',
      company: 'Systems Variable Technicom, Inc.',
      description: 'Led large-scale security and home automation implementations, ensuring compliance with Data Privacy Act and governance standards.'
    },
    {
      period: 'Oct 2010 - Dec 2012',
      title: 'IT Technical Project Manager',
      company: 'Main Hardware, Inc. (BSP, JP Morgan, Emerson)',
      description: 'Managed end-to-end delivery of large-scale security and infrastructure projects. Designed and implemented security operations centers and access control systems for banking and enterprise clients. Led vendor selection, contract negotiation, and budget management.'
    },
    {
      period: 'Jan 2010 - Oct 2010',
      title: 'Partnerships Manager',
      company: 'Gawad Kalinga Development Foundation Center',
      description: 'Managed strategic partnerships, client relations, and community development leadership initiatives.'
    }
  ];

  const competencies = [
    'Strategic Planning & Executive Reporting',
    'ERP Implementation & Digital Transformation',
    'IT Operations Leadership & ITSM (ITIL v4)',
    'Incident, Problem & Change Management',
    'SRE, Observability & 24x7 NOC Operations',
    'DevOps & CI/CD Pipeline Architecture',
    'Cloud Infrastructure (AWS, Azure, GCP)',
    'Kubernetes, Containers & Infrastructure as Code',
    'IT & Security Governance (ISO 27001, COBIT, NIST)',
    'Solution Architecture & Systems Integration',
    'Program, Portfolio & Vendor Management',
    'Business Continuity & Disaster Recovery (BCP/DRP)',
    'Data Privacy Act Compliance',
    'AI & Machine Learning Integration',
    'Team Leadership & Cross-functional Collaboration'
  ];

  const leadershipPrinciples = [
    {
      title: 'Strategic Vision',
      description: 'Aligning technology initiatives with business objectives to drive measurable outcomes'
    },
    {
      title: 'Innovation & Adaptability',
      description: 'Embracing emerging technologies while maintaining operational stability'
    },
    {
      title: 'Team Empowerment',
      description: 'Building high-performing teams through mentorship, trust, and clear communication'
    },
    {
      title: 'Results-Driven',
      description: 'Focusing on delivery excellence and continuous improvement'
    }
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
            About Me
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Technology leader with 10+ years of experience driving digital transformation,
            architecting enterprise solutions, and building high-performing teams across diverse industries
          </p>
        </motion.div>

        {/* Leadership Narrative */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-[#0f1629] border-[#1a1f3a]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="h-6 w-6 text-[#d4af37]" />
                  Leadership Philosophy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Throughout my career, I've been privileged to lead transformative technology initiatives
                  that have reshaped how organizations operate. From architecting enterprise ERP systems
                  to building cloud-native infrastructures, my focus has always been on delivering solutions
                  that create measurable business value.
                </p>
                <p className="text-gray-300">
                  My approach combines strategic thinking with hands-on technical expertise. I believe in
                  empowering teams, fostering innovation, and maintaining a relentless focus on execution.
                  Whether leading digital transformation at a trading corporation or architecting secure
                  fintech platforms, I bring the same commitment to excellence and results.
                </p>
                <p className="text-gray-300">
                  I lead IT Operations with an ITIL v4-aligned mindset — building service desks,
                  NOC capabilities, and SRE practices that keep enterprises running 24x7. From
                  incident, problem, and change management to observability, capacity planning,
                  and business continuity, my operating model emphasizes proactive monitoring,
                  measurable SLAs, and continuous service improvement.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Leadership Principles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Leadership Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leadershipPrinciples.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-[#0f1629] border-[#1a1f3a] h-full">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{principle.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{principle.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Career Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center justify-center gap-2">
            <Briefcase className="h-8 w-8 text-[#d4af37]" />
            Career Journey
          </h2>
          <div className="space-y-6">
            {careerTimeline.map((role, index) => (
              <motion.div
                key={`${role.company}-${role.period}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-[#0f1629] border-[#1a1f3a]">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="md:w-48 flex-shrink-0">
                        <div className="text-[#d4af37] font-semibold">{role.period}</div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold text-white mb-1">{role.title}</h3>
                        <div className="text-gray-400 mb-3">{role.company}</div>
                        <p className="text-gray-300">{role.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Core Competencies */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center justify-center gap-2">
            <GraduationCap className="h-8 w-8 text-[#d4af37]" />
            Core Competencies
          </h2>
          <Card className="bg-[#0f1629] border-[#1a1f3a]">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {competencies.map((competency, index) => (
                  <motion.div
                    key={competency}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-[#d4af37] rounded-full flex-shrink-0" />
                    <span className="text-gray-300">{competency}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
