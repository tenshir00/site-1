import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { ProjectService } from '../services/projectService';
import { Project } from '../types/Project';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const fetchedProjects = await ProjectService.getProjects();
        console.log('Loaded projects:', fetchedProjects);
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleProjectClick = (project: Project) => {
    if (project.external_url) {
      window.open(project.external_url, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
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
        <div className="text-center py-12">
          <p className="text-gray-500">Loading projects...</p>
        </div>
      </div>
    );
  }

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
          <div 
            key={index} 
            className="group cursor-pointer"
            onClick={() => handleProjectClick(project)}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                {project.title}
              </h3>
              <div className="flex items-center space-x-3">
                <span className="text-gray-500">
                  {project.date}
                </span>
                <button 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectClick(project);
                  }}
                >
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
            
            {project.subheader && (
              <p className="text-gray-700 mb-4 leading-relaxed">
                {project.subheader}
              </p>
            )}
            
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="text-gray-500 bg-gray-50 px-2 py-1 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {projects.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;