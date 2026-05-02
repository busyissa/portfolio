"use client";

import React, { useState } from 'react';
import { GitBranch, Eye } from 'lucide-react';

interface TechStack {
  name: string;
  color: string;
}

export interface Project {
  id: number;
  title: string;
  shortDesc: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  techStack: TechStack[];
  github?: string;
  demo?: string;
  image: string;
  status: string;
  type: string;
  featured: boolean;
  users?: string;
  year: string;
}

interface ProjectCardProps {
  project: Project;
  expandedProject: number | null;
  setExpandedProject: (id: number | null) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  expandedProject,
  setExpandedProject,
}) => {
  const isExpanded = expandedProject === project.id;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Live': return 'bg-green-500';
      case 'In Development': return 'bg-yellow-500';
      case 'Completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="h-full bg-slate-900 rounded-2xl overflow-hidden transition-all duration-300 group relative hover:shadow-xl hover:shadow-cyan-500/5 border border-slate-700/60 hover:border-cyan-500/30">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        {/* Project Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)} text-white`}>
                {project.status}
              </span>
            </div>
            <p className="text-gray-400 text-sm">{project.shortDesc} • {project.year}</p>
            {project.users && (
              <p className="text-cyan-400 text-xs mt-1">{project.users}</p>
            )}
          </div>
        </div>

        {/* Project Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {isExpanded ? project.detailedDescription : project.description}
        </p>
        
        {/* Expand/Collapse Button */}
        <button
          onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
          className="text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-4 transition-colors"
        >
          {expandedProject === project.id ? 'Show Less' : 'Read More'}
        </button>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.techStack.map((tech, i) => (
            <span key={i} className="px-2 py-0.5 text-xs font-mono text-cyan-400 border border-cyan-500/30 rounded-full">
              {tech.name}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.demo && (
            <a
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Eye size={16} />
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 border border-slate-600"
            >
              <GitBranch size={16} />
              Code
            </a>
          )}
        </div>
        {project.status === 'In Development' && !project.github && (
          <p className="text-yellow-400 text-xs mt-4">
            This project is currently in active development and will be available on GitHub soon!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
