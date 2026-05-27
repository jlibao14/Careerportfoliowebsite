import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../app/components/ui/card';
import { Badge } from '../app/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/portfolio/${project.id}`}>
        <Card className="h-full bg-[#0f1629] border-[#1a1f3a] hover:border-[#d4af37] transition-all duration-300 group">
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <Badge variant="secondary" className="bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/20">
                {project.category}
              </Badge>
              <ArrowRight className="h-4 w-4 text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <CardTitle className="text-white group-hover:text-[#d4af37] transition-colors">
              {project.title}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {project.company} • {project.role}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-sm mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 bg-[#1a1f3a] text-gray-400 rounded"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="text-xs px-2 py-1 text-gray-500">
                  +{project.techStack.length - 3} more
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
