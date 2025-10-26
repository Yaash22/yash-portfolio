import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, Code } from 'lucide-react';
import { ExperienceEntry } from '@/lib/types';

interface TimelineProps {
  entries: ExperienceEntry[];
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ entries, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-space-blue to-neon-green"></div>
      
      <div className="space-y-8">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex items-start space-x-6"
          >
            {/* Timeline dot */}
            <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-space-gray border-4 border-neon-blue rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-neon-blue rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-space-dark" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-space-gray/50 backdrop-blur-sm border border-space-blue/20 rounded-lg p-6 hover:border-neon-green/50 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{entry.position}</h3>
                  <p className="text-neon-blue font-semibold">{entry.company}</p>
                </div>
                <div className="flex items-center space-x-4 mt-2 md:mt-0 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{entry.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{entry.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-4">{entry.description}</p>

              {/* Achievements */}
              {entry.achievements && entry.achievements.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {entry.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-gray-300 text-sm flex items-start space-x-2">
                        <span className="text-neon-green mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              {entry.tech_stack && entry.tech_stack.length > 0 && (
                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Code className="w-4 h-4" />
                    <span>Tech Stack:</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {entry.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-space-blue/20 text-neon-blue rounded text-xs border border-space-blue/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
