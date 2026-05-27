import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Button } from '../app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../app/components/ui/card';
import {
  ArrowRight,
  Building2,
  Cloud,
  Shield,
  Code,
  Users,
  TrendingUp,
  LifeBuoy,
  Activity
} from 'lucide-react';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';

export function Home() {
  const featuredProjects = projects.filter(p => p.featured);

  const metrics = [
    { label: 'Years Experience', value: '10+', icon: TrendingUp },
    { label: 'Projects Delivered', value: '50+', icon: Building2 },
    { label: 'Teams Led', value: '15+', icon: Users }
  ];

  const expertiseAreas = [
    {
      icon: Building2,
      title: 'ERP & Digital Transformation',
      description: 'Leading enterprise-wide digital initiatives and ERP implementations'
    },
    {
      icon: Cloud,
      title: 'Cloud & Infrastructure',
      description: 'Architecting scalable cloud solutions and hybrid infrastructure'
    },
    {
      icon: Code,
      title: 'DevOps & Software Engineering',
      description: 'Building CI/CD pipelines and modern application architectures'
    },
    {
      icon: LifeBuoy,
      title: 'IT Operations & Service Management',
      description: 'Leading ITIL-aligned IT Operations, ITSM, and 24x7 service delivery'
    },
    {
      icon: Activity,
      title: 'Observability & Site Reliability',
      description: 'Driving SRE practices, monitoring, and proactive incident response'
    },
    {
      icon: Shield,
      title: 'IT Governance & Compliance',
      description: 'Establishing security frameworks and regulatory compliance'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              John Michael L. Libao
            </h1>
            <div className="text-2xl md:text-3xl text-[#d4af37] mb-6">
              Head of IT & Digital Transformation and ERP Program Director
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transforming businesses through strategic technology leadership, enterprise architecture,
              and innovative digital solutions. 10+ years driving operational excellence and business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0a0e27]"
              >
                <Link to="/portfolio">
                  View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0e27]"
              >
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0f1629]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-[#0a0e27] border-[#1a1f3a] text-center">
                  <CardContent className="pt-6">
                    <metric.icon className="h-8 w-8 text-[#d4af37] mx-auto mb-4" />
                    <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
                    <div className="text-gray-400">{metric.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Core Expertise
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive technology leadership across enterprise transformation,
              cloud infrastructure, and strategic program management
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-[#0f1629] border-[#1a1f3a] h-full">
                  <CardHeader>
                    <area.icon className="h-10 w-10 text-[#d4af37] mb-4" />
                    <CardTitle className="text-white">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{area.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f1629]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Showcasing impactful digital transformation initiatives and enterprise solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              variant="outline"
              className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0e27]"
            >
              <Link to="/portfolio">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how strategic technology leadership can drive your organization forward
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#d4af37] hover:bg-[#b8941f] text-[#0a0e27]"
            >
              <Link to="/contact">
                Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
