import React from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit = '',
  description,
  icon,
  trend,
  className = ''
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-neon-green';
      case 'down':
        return 'text-red-400';
      case 'stable':
        return 'text-neon-blue';
      default:
        return 'text-white';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-space-gray/50 backdrop-blur-sm border border-space-blue/20 rounded-lg p-6 hover:border-neon-green/50 transition-all duration-300 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-300 text-sm font-medium uppercase tracking-wide">
          {title}
        </h3>
        {icon && (
          <div className="text-neon-blue">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span className={`text-3xl font-bold ${getTrendColor()}`}>
          {value}
        </span>
        {unit && (
          <span className="text-gray-400 text-lg">
            {unit}
          </span>
        )}
      </div>
      
      {description && (
        <p className="text-gray-400 text-sm mt-2">
          {description}
        </p>
      )}
      
      {trend && (
        <div className="mt-3">
          <div className={`text-xs font-medium ${getTrendColor()}`}>
            {trend === 'up' && '↗ Trending up'}
            {trend === 'down' && '↘ Trending down'}
            {trend === 'stable' && '→ Stable'}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MetricCard;
