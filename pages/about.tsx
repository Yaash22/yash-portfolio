import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { TrendingUp, Code, Database, Calendar, Signal } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MetricCard from '@/components/MetricCard';
import { Metrics } from '@/lib/types';

const AboutPage: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/metrics');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const skills = [
    { name: 'Python', level: 75, category: 'Programming' as const },
    { name: 'Machine Learning', level: 80, category: 'ML/AI' as const },
    { name: 'Data Analysis', level: 92, category: 'ML/AI' as const },
    { name: 'SQL', level: 88, category: 'Programming' as const },
    { name: 'TensorFlow', level: 80, category: 'ML/AI' as const },
    { name: 'PyTorch', level: 82, category: 'ML/AI' as const },
    { name: 'Azure', level: 40, category: 'Cloud' as const },
    { name: 'Docker', level: 78, category: 'Tools' as const },
    { name: 'Git', level: 90, category: 'Tools' as const },
  ];

  return (
    <>
      <Head>
        <title>Telemetry Feed — Mission Control</title>
        <meta name="description" content="Live metrics and performance data from Mission Control operations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen mission-control-bg">
        <Navigation />
        
        {/* Header */}
        <section className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Telemetry Feed
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Live metrics and performance data from Mission Control operations
              </p>
            </motion.div>
          </div>
        </section>

        {/* Metrics Grid */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-space-gray/50 border border-space-blue/20 rounded-lg p-6 animate-pulse">
                    <div className="h-4 bg-gray-600 rounded mb-4"></div>
                    <div className="h-8 bg-gray-600 rounded"></div>
                  </div>
                ))
              ) : metrics ? (
                <>
                  <MetricCard
                    title="Academic Performance"
                    value={metrics.cgpa}
                    unit="/10"
                    description="Cumulative GPA"
                    icon={<TrendingUp className="w-5 h-5" />}
                    trend="up"
                  />
                  <MetricCard
                    title="Data Missions"
                    value={metrics.projects_count}
                    unit="projects"
                    description="Completed missions"
                    icon={<Database className="w-5 h-5" />}
                    trend="up"
                  />
                  <MetricCard
                    title="Tools Mastered"
                    value={metrics.tools_count}
                    unit="tools"
                    description="Technologies learned"
                    icon={<Code className="w-5 h-5" />}
                    trend="up"
                  />
                  <MetricCard
                    title="Internship Experience"
                    value={metrics.years_exp}
                    unit="internships"
                    description="Completed internships"
                    icon={<Calendar className="w-5 h-5" />}
                    trend="stable"
                  />
                </>
              ) : (
                <div className="col-span-full text-center text-gray-400">
                  Failed to load telemetry data
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                Signal Strength Analysis
              </h2>
              <p className="text-gray-300 text-center mb-12">
                Technical proficiency levels across different domains
              </p>
              
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="bg-space-gray/50 border border-space-blue/20 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Signal className="w-5 h-5 text-neon-blue" />
                        <span className="text-white font-semibold">{skill.name}</span>
                        <span className="px-2 py-1 bg-space-blue/20 text-neon-blue rounded text-xs">
                          {skill.category}
                        </span>
                      </div>
                      <span className="text-neon-green font-bold">{skill.level}%</span>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full bg-space-dark rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                          className="signal-bar"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-space-gray/30 border border-neon-green/20 rounded-lg p-8"
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Mission Statement
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                To harness the power of data and artificial intelligence to solve complex problems, 
                drive innovation, and create intelligent systems that make a meaningful impact on society. 
                Every line of code, every algorithm, every model is a step toward a more intelligent future.
              </p>
              <div className="flex items-center justify-center space-x-2 text-neon-green">
                <Signal className="w-5 h-5" />
                <span className="font-semibold">Signal Status: Strong</span>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default AboutPage;
