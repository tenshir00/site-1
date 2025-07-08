import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Infrastructure Dashboard",
      description: "A real-time monitoring dashboard for distributed systems with custom metrics and alerting.",
      technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
      status: "Active",
      year: "2024"
    },
    {
      title: "Design System",
      description: "A comprehensive design system and component library for modern web applications.",
      technologies: ["TypeScript", "Storybook", "Figma", "CSS-in-JS"],
      status: "Maintained",
      year: "2023"
    },
    {
      title: "CLI Tool",
      description: "A command-line interface for managing development workflows and deployment pipelines.",
      technologies: ["Go", "Cobra", "Docker", "Kubernetes"],
      status: "Open Source",
      year: "2023"
    },
    {
      title: "Mobile App",
      description: "A cross-platform mobile application for personal productivity and habit tracking.",
      technologies: ["React Native", "TypeScript", "Firebase", "Redux"],
      status: "Published",
      year: "2022"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Projects
        </h2>
        <p className="text-gray-600 mb-8">
          Selected projects and experiments in technology, finance, and business consulting.
        </p>
      </div>
      
      <div className="space-y-12">
        {projects.map((project, index) => (
          <div key={index} className="group">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                {project.title}
              </h3>
              <div className="flex items-center space-x-3">
                <span className="text-gray-500">
                  {project.year}
                </span>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <ExternalLink size={16} />
                </button>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Github size={16} />
                </button>
              </div>
            </div>
            
            <div className="mb-3">
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium">
                {project.status}
              </span>
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <span 
                  key={techIndex}
                  className="text-gray-500 bg-gray-50 px-2 py-1 rounded text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;