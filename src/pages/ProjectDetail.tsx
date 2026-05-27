import { motion } from 'motion/react';
import { useParams, Link } from 'react-router';
import { projects } from '../data/projects';
import { Card, CardContent, CardHeader, CardTitle } from '../app/components/ui/card';
import { Badge } from '../app/components/ui/badge';
import { Button } from '../app/components/ui/button';
import { ArrowLeft, Building2, Briefcase, TrendingUp } from 'lucide-react';

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0e27] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Project Not Found</h1>
          <Button asChild variant="outline" className="border-[#d4af37] text-[#d4af37]">
            <Link to="/portfolio">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button asChild variant="outline" className="border-[#1a1f3a] text-gray-300">
            <Link to="/portfolio">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Link>
          </Button>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Badge variant="secondary" className="bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/20 mb-4">
            {project.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {project.title}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>{project.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>{project.role}</span>
            </div>
          </div>
        </motion.div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-[#0f1629] border-[#1a1f3a]">
            <CardHeader>
              <CardTitle className="text-white">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">{project.description}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-[#0f1629] border-[#1a1f3a] h-full">
              <CardHeader>
                <CardTitle className="text-white">The Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{project.problem}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-[#0f1629] border-[#1a1f3a] h-full">
              <CardHeader>
                <CardTitle className="text-white">The Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{project.solution}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-[#0f1629] border-[#1a1f3a]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#d4af37]" />
                Impact & Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {project.metrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-[#d4af37] mb-2">
                      {metric.value}
                    </div>
                    <div className="text-gray-400 text-sm">{metric.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-[#0f1629] border-[#1a1f3a]">
            <CardHeader>
              <CardTitle className="text-white">Technologies & Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-[#1a1f3a] text-gray-300 border-[#2a2f4a]"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
