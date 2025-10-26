import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Award, Code } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Timeline from '@/components/Timeline';
import { ExperienceEntry } from '@/lib/types';

const ExperiencePage: React.FC = () => {
  const experienceData: ExperienceEntry[] = [
    {
      id: 'volvo-rag',
      company: 'Volvo Group',
      position: 'GenAI Intern',
      duration: 'Jun 2024 - July 2024',
      location: 'Bengaluru, India',
      description: 'Developed and deployed a Retrieval-Augmented Generation (RAG) system for automotive documentation, improving information retrieval efficiency by 60% and reducing response time to 1.2 seconds.',
      achievements: [
        'Built end-to-end RAG pipeline using LangChain and OpenAI GPT models',
        'Implemented hybrid retrieval strategy combining semantic and keyword search',
        'Achieved 72% accuracy in technical documentation queries',
        'Reduced operational costs through automated documentation assistance',
        'Led cross-functional collaboration with engineering and product teams'
      ],
      tech_stack: ['Python', 'LangChain', 'OpenAI', 'Pinecone', 'FastAPI', 'Docker', 'Azure']
    },
    {
      id: 'psm-analytics',
      company: 'SES',
      position: 'PSM Analytics Intern',
      duration: 'August 2025 - Present',
      location: 'Chennai, India',
      description: 'Working on building a generative AI agent that can answer questions about the company and its products.',
      achievements: [
        'Built interactive dashboards using Tableau and Power BI',
        'Presented findings to stakeholders and clients',
        'Led team coordination for AI model deployment'
      ],
      tech_stack: ['Python', 'Pandas', 'Tableau', 'Power BI', 'SQL', 'Jupyter']
    },
    {
      id: 'vit-leadership',
      company: 'VIT University',
      position: 'Festival Management & Leadership',
      duration: '2022 - 2024',
      location: 'Vellore, India',
      description: 'Led and managed major college festivals including Gravitas (Tech Fest) and Riviera (Cultural Fest), developing strong project management and team leadership skills.',
      achievements: [
        'Managed teams of 50+ students across multiple festival departments',
        'Coordinated technical events and competitions for Gravitas Tech Fest',
        'Organized cultural performances and logistics for Riviera Cultural Fest',
        'Developed event management strategies and vendor coordination',
        'Led cross-functional teams in high-pressure festival environments',
      ],
      tech_stack: ['Project Management', 'Team Leadership', 'Event Planning', 'Vendor Management', 'Digital Solutions']
    }
  ];

  return (
    <>
      <Head>
        <title>Ground Control Logs — Mission Control</title>
        <meta name="description" content="Mission logs and experience timeline from Ground Control operations" />
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
                Ground Control Logs
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Mission timeline and operational experience from various deployments
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Timeline entries={experienceData} />
          </div>
        </section>

        {/* Mission Summary */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-neon-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-neon-blue" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">2</h3>
                <p className="text-gray-400">Internship Experiences</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-neon-green" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">2 Companies</h3>
                <p className="text-gray-400">Professional Deployments</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-neon-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-neon-purple" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">10+ Tools</h3>
                <p className="text-gray-400">Technologies Mastered</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Philosophy */}
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
                Mission Philosophy
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Every mission is an opportunity to learn, grow, and make a meaningful impact. 
                From building RAG systems that revolutionize documentation access to developing 
                anomaly detection systems that protect critical infrastructure, each project 
                represents a step forward in our understanding of data and AI.
              </p>
              <div className="flex items-center justify-center space-x-2 text-neon-green">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">Mission Status: Active</span>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default ExperiencePage;
