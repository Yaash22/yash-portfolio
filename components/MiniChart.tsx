import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamically import Plot to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-32 bg-space-gray/50 rounded flex items-center justify-center">
      <div className="text-gray-400 text-sm">Loading chart...</div>
    </div>
  )
});

interface MiniChartProps {
  data: any;
  type: 'bar' | 'line' | 'scatter' | 'heatmap';
  title?: string;
  className?: string;
}

const MiniChart: React.FC<MiniChartProps> = ({ data, type, title, className = '' }) => {
  const getPlotConfig = () => {
    const baseConfig = {
      displayModeBar: false,
      responsive: true,
    };

    const baseLayout = {
      margin: { l: 20, r: 20, t: 20, b: 20 },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: { color: '#ffffff', size: 10 },
      xaxis: {
        color: '#9ca3af',
        gridcolor: 'rgba(0, 102, 255, 0.1)',
      },
      yaxis: {
        color: '#9ca3af',
        gridcolor: 'rgba(0, 102, 255, 0.1)',
      },
    };

    switch (type) {
      case 'bar':
        return {
          data: [{
            x: data.labels || data.x,
            y: data.values || data.y,
            type: 'bar',
            marker: {
              color: '#00ff88',
              line: { color: '#0066ff', width: 1 }
            },
          }],
          layout: {
            ...baseLayout,
            title: title ? { text: title, font: { size: 12 } } : undefined,
          },
          config: baseConfig,
        };

      case 'line':
        return {
          data: [{
            x: data.labels || data.x,
            y: data.values || data.y,
            type: 'scatter',
            mode: 'lines+markers',
            line: { color: '#00aaff', width: 2 },
            marker: { color: '#0066ff', size: 4 },
          }],
          layout: {
            ...baseLayout,
            title: title ? { text: title, font: { size: 12 } } : undefined,
          },
          config: baseConfig,
        };

      case 'scatter':
        return {
          data: [{
            x: data.x,
            y: data.y,
            type: 'scatter',
            mode: 'markers',
            marker: {
              color: data.z || '#00ff88',
              size: 6,
              line: { color: '#0066ff', width: 1 }
            },
          }],
          layout: {
            ...baseLayout,
            title: title ? { text: title, font: { size: 12 } } : undefined,
          },
          config: baseConfig,
        };

      case 'heatmap':
        return {
          data: [{
            z: data.z,
            type: 'heatmap',
            colorscale: [
              [0, '#0a0a0a'],
              [0.5, '#0066ff'],
              [1, '#00ff88']
            ],
          }],
          layout: {
            ...baseLayout,
            title: title ? { text: title, font: { size: 12 } } : undefined,
          },
          config: baseConfig,
        };

      default:
        return {
          data: [],
          layout: baseLayout,
          config: baseConfig,
        };
    }
  };

  const plotConfig = getPlotConfig();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`w-full h-32 ${className}`}
    >
      <Plot
        data={plotConfig.data}
        layout={plotConfig.layout}
        config={plotConfig.config}
        style={{ width: '100%', height: '100%' }}
      />
    </motion.div>
  );
};

export default MiniChart;
