import { motion } from 'motion/react';
import { useState } from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { Tabs, TabsList, TabsTrigger } from '../app/components/ui/tabs';

export function Portfolio() {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-[#0a0e27] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Portfolio
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A showcase of enterprise digital transformation projects, cloud migrations,
            and strategic technology initiatives across diverse industries
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="bg-[#0f1629] border border-[#1a1f3a]">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-[#0a0e27]"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
