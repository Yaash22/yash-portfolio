import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { ExternalLink, Download, MapPin, Calendar, Code, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProjectModal from '@/components/ProjectModal';
import ProjectGlobe from '@/components/ProjectGlobe';
import MiniChart from '@/components/MiniChart';
import { Project, ProjectData } from '@/lib/types';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectData, setProjectData] = useState<Record<string, ProjectData>>({});
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
      
      // Fetch data for each project
      const dataPromises = data.map(async (project: Project) => {
        try {
          const dataResponse = await fetch(`/api/project/${project.id}`);
          const projectData = await dataResponse.json();
          return { id: project.id, data: projectData.data };
        } catch (error) {
          console.error(`Error fetching data for ${project.id}:`, error);
          return { id: project.id, data: {} };
        }
      });
      
      const allProjectData = await Promise.all(dataPromises);
      const dataMap = allProjectData.reduce((acc, item) => {
        acc[item.id] = item.data;
        return acc;
      }, {} as Record<string, ProjectData>);
      
      setProjectData(dataMap);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const getChartData = (projectId: string, data: ProjectData) => {
    switch (projectId) {
      case 'volvo-rag':
        return {
          type: 'line' as const,
          data: {
            labels: data.accuracy_over_time?.map((item: any) => item.month) || [],
            values: data.accuracy_over_time?.map((item: any) => item.accuracy) || []
          },
          title: 'Accuracy Over Time'
        };
      case 'satellite-anomaly':
        return {
          type: 'bar' as const,
          data: {
            labels: data.anomaly_types?.map((item: any) => item.type) || [],
            values: data.anomaly_types?.map((item: any) => item.count) || []
          },
          title: 'Anomaly Types Detected'
        };
      case 'land-use-classification':
        return {
          type: 'bar' as const,
          data: {
            labels: data.class_distribution?.map((item: any) => item.class) || [],
            values: data.class_distribution?.map((item: any) => item.count) || []
          },
          title: 'Class Distribution'
        };
      default:
        return {
          type: 'bar' as const,
          data: { labels: [], values: [] },
          title: 'Project Data'
        };
    }
  };

  return (
    <>
      <Head>
        <title>Data Missions — Mission Control</title>
        <meta name="description" content="Explore completed and ongoing data science missions" />
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
                Data Missions
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Explore completed and ongoing data science missions across various domains
              </p>
            </motion.div>
          </div>
        </section>

 

        {/* Globe Visualization */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ProjectGlobe projects={projects} />
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-space-gray/50 border border-space-blue/20 rounded-lg p-6 animate-pulse">
                    <div className="h-4 bg-gray-600 rounded mb-4"></div>
                    <div className="h-6 bg-gray-600 rounded mb-4"></div>
                    <div className="h-20 bg-gray-600 rounded mb-4"></div>
                    <div className="h-8 bg-gray-600 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => {
                  const chartConfig = getChartData(project.id, projectData[project.id] || {});
                  
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-space-gray/50 backdrop-blur-sm border border-space-blue/20 rounded-lg p-6 hover:border-neon-green/50 transition-all duration-300 cursor-pointer group"
                      onClick={() => handleProjectClick(project)}
                    >
                      {/* Project Header */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2 py-1 bg-neon-green/20 text-neon-green rounded text-xs font-medium">
                            {project.status}
                          </span>
                          <span className="text-gray-400 text-sm">{project.duration}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-green transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                        <div className="flex items-center text-gray-400 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{project.location.city}</span>
                        </div>
                      </div>

                      {/* Mini Chart */}
                      <div className="mb-4">
                        <MiniChart
                          data={chartConfig.data}
                          type={chartConfig.type}
                          title={chartConfig.title}
                        />
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Code className="w-4 h-4 text-neon-blue" />
                          <span className="text-white font-semibold text-sm">Tech Stack</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {project.tech_stack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-space-blue/20 text-neon-blue rounded text-xs border border-space-blue/30"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech_stack.length > 3 && (
                            <span className="px-2 py-1 bg-gray-600 text-gray-300 rounded text-xs">
                              +{project.tech_stack.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Key Results */}
                      <div className="mb-4">
                        <h4 className="text-white font-semibold text-sm mb-2">Key Results</h4>
                        <div className="space-y-1">
                          {Object.entries(project.key_results).slice(0, 2).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-xs">
                              <span className="text-gray-400 capitalize">
                                {key.replace('_', ' ')}:
                              </span>
                              <span className="text-neon-green font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Click to view details</span>
                        <ArrowRight className="w-4 h-4 text-neon-blue group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Mission Summary */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-space-gray/30 border border-space-blue/20 rounded-lg p-8"
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Mission Summary
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Each mission represents a unique challenge in the vast universe of data science and AI. 
                From building intelligent RAG systems to detecting anomalies in satellite telemetry, 
                every project pushes the boundaries of what's possible with data.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-green mb-2">12+</div>
                  <div className="text-gray-400">Completed Missions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-blue mb-2">2</div>
                  <div className="text-gray-400">Active Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-purple mb-2">94%</div>
                  <div className="text-gray-400">Average Success Rate</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
      
      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProjectsPage;
