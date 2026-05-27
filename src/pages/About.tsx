import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../app/components/ui/card';
import { Briefcase, Award, GraduationCap } from 'lucide-react';

export function About() {
  const careerTimeline = [
    {
      period: 'Nov 2025 - Present',
      title: 'Head, IT Digital Transformation & ERP Program Director',
      company: 'GTO Trading Corporation',
      description: 'Leading enterprise-wide digital transformation initiatives, managing IT infrastructure, and directing strategic technology programs'
    },
    {
      period: '2023 - 2025',
      title: 'IT Manager',
      company: 'Chris Sports Inc. (Retail)',
      description: 'Managed IT operations across multiple retail locations, implemented cloud migration strategies, and optimized business processes'
    },
    {
      period: '2022 - 2023',
      title: 'IT Consultant - Solutions Architect',
      company: 'Lee Designs Inds.',
      description: 'Designed enterprise architecture solutions, established DevOps practices, and led infrastructure modernization'
    },
    {
      period: 'Oct 2021 - Jul 2025',
      title: 'Co-Founder',
      company: 'Mikaela\'s AguaBest Water Distribution Services',
      description: 'Built business from ground up, managed operations, and implemented business automation systems'
    },
    {
      period: '2020 - 2022',
      title: 'IT Consultant - Engineering Head',
      company: 'Ventaja International Corp./PAYREMIT (Fintech)',
      description: 'Led engineering team, architected secure payment systems, and ensured regulatory compliance'
    },
    {
      period: '2012 - 2020',
      title: 'Senior Dev & IT Ops Engineer',
      company: 'VXI Global Solutions (BPO)',
      description: '8+ years scaling infrastructure, automating operations, and supporting 1000+ concurrent users'
    },
    {
      period: '2010 - 2012',
      title: 'Senior Software Engineer',
      company: 'Main Hardware Inc.',
      description: 'Developed and integrated banking systems for BSP/JP Morgan/Emerson platforms'
    }
  ];

  const competencies = [
    'Strategic Planning & Executive Reporting',
    'ERP Implementation & Digital Transformation',
    'DevOps & CI/CD Pipeline Architecture',
    'Cloud Infrastructure (AWS, Azure)',
    'IT & Security Governance',
    'Solution Architecture & Systems Integration',
    'Program & Vendor Management',
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
