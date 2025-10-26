import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Navigation } from 'lucide-react';

interface ProjectGlobeProps {
  projects: Array<{
    id: string;
    title: string;
    location: {
      lat: number;
      lng: number;
      city: string;
    };
  }>;
  className?: string;
}

const ProjectGlobe: React.FC<ProjectGlobeProps> = ({ projects, className = '' }) => {
  // Create a beautiful static globe visualization
  const GlobeVisualization = () => (
    <div className="w-full h-96 bg-gradient-to-br from-space-dark via-space-gray to-space-dark rounded-lg relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Central globe representation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {/* Globe circles */}
          <div className="w-48 h-48 rounded-full border-2 border-neon-blue/30 relative">
            <div className="absolute inset-2 rounded-full border border-neon-green/20"></div>
            <div className="absolute inset-4 rounded-full border border-neon-purple/20"></div>
            
            {/* Project markers */}
            {projects.map((project, index) => {
              const angle = (index * 360) / projects.length;
              const x = Math.cos((angle * Math.PI) / 180) * 80;
              const y = Math.sin((angle * Math.PI) / 180) * 80;
              
              return (
                <motion.div
                  key={project.id}
                  className="absolute w-3 h-3 bg-neon-green rounded-full border border-space-dark"
                  style={{
                    left: `calc(50% + ${x}px - 6px)`,
                    top: `calc(50% + ${y}px - 6px)`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-64 h-64 border border-neon-blue/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-80 h-80 border border-neon-green/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Mission control text */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <div className="bg-space-dark/80 backdrop-blur-sm rounded-lg p-3 border border-space-blue/20">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <Globe className="w-4 h-4 text-neon-blue" />
            <span className="text-white font-semibold text-sm">Mission Control Globe</span>
          </div>
          <div className="text-gray-400 text-xs">
            {projects.length} active missions across the globe
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`relative ${className}`}>
      <GlobeVisualization />
      
      {/* Project locations overlay */}
      <div className="absolute top-4 left-4 bg-space-dark/80 backdrop-blur-sm rounded-lg p-4 border border-space-blue/20 max-w-xs">
        <div className="flex items-center space-x-2 mb-3">
          <Navigation className="w-4 h-4 text-neon-green" />
          <span className="text-white font-semibold text-sm">Mission Locations</span>
        </div>
        
        <div className="space-y-2">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center space-x-2 text-xs">
              <div className="w-2 h-2 bg-neon-green rounded-full"></div>
              <span className="text-gray-300">{project.location.city}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectGlobe;
