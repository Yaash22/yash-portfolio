import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Download, MapPin } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-space-gray border border-space-blue/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-space-blue/20">
              <div>
                <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                <p className="text-gray-400 mt-1">{project.description}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white focus-ring p-2"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Mission Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-neon-green">{project.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white">{project.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Category:</span>
                      <span className="text-white">{project.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {project.location.city}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Key Results</h3>
                  <div className="space-y-2">
                    {Object.entries(project.key_results).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-400 capitalize">
                          {key.replace('_', ' ')}:
                        </span>
                        <span className="text-neon-green font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-space-blue/20 text-neon-blue rounded-full text-sm border border-space-blue/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-space-blue/20">
                <a
                  href={`https://github.com/Yaash22/${project.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-space-blue/20 text-neon-blue rounded-lg hover:bg-space-blue/30 transition-colors focus-ring"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View on GitHub</span>
                </a>
                <a
                  href="/public/media/sample-notebook.pdf"
                  download
                  className="flex items-center space-x-2 px-4 py-2 bg-neon-green/20 text-neon-green rounded-lg hover:bg-neon-green/30 transition-colors focus-ring"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Artifact</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
