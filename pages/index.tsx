import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight, Play, Users, Database, FileText } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const HomePage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>Mission Control — Yash Allampalli | Data & AI Explorer</title>
        <meta name="description" content="Mission Control — Yash Allampalli: Exploring the universe of data and AI. Building intelligent systems that push the boundaries of what's possible." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Mission Control — Yash Allampalli" />
        <meta property="og:description" content="AI Enthusiast | Developer | Security & DevOps Explorer - Exploring the universe of data and AI" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yashallampalli.com" />
        <meta property="og:image" content="/og-image.jpg" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mission Control — Yash Allampalli" />
        <meta name="twitter:description" content="AI Enthusiast | Developer | Security & DevOps Explorer - Exploring the universe of data and AI" />
        <meta name="twitter:image" content="/og-image.jpg" />
      </Head>

      <div className="min-h-screen mission-control-bg">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Mission: <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-green">Yash Allampalli</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Exploring the Universe of Data & AI
                </p>
                <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
                  AI Enthusiast | Developer | Security & DevOps Explorer. 
                  Building AI-powered applications, experimenting with machine learning models, and exploring cybersecurity & DevOps tools.
                </p>
              </motion.div>

              {/* Animated Orbit */}
              {isClient && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="relative w-80 h-80 mx-auto mb-12"
                >
                  <svg className="w-full h-full" viewBox="0 0 320 320">
                    {/* Orbit paths */}
                    <circle
                      cx="160"
                      cy="160"
                      r="120"
                      className="orbit-path"
                    />
                    <circle
                      cx="160"
                      cy="160"
                      r="80"
                      className="orbit-path"
                      style={{ animationDelay: '5s' }}
                    />
                    
                    {/* Central hub */}
                    <circle
                      cx="160"
                      cy="160"
                      r="8"
                      className="fill-neon-green animate-pulse-neon"
                    />
                    
                    {/* Orbiting dots */}
                    <motion.circle
                      cx="280"
                      cy="160"
                      r="4"
                      className="fill-neon-blue"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: '160px 160px' }}
                    />
                    <motion.circle
                      cx="240"
                      cy="160"
                      r="3"
                      className="fill-neon-purple"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: '160px 160px' }}
                    />
                  </svg>
                  
                  {/* Mission milestone labels */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-2">Mission Control</div>
                      <div className="text-sm text-gray-400">Data & AI Operations</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link
                  href="/about"
                  className="group flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-green text-space-dark font-semibold rounded-lg hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 focus-ring"
                >
                  <Rocket className="w-5 h-5" />
                  <span>View Telemetry</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  href="/projects"
                  className="group flex items-center space-x-2 px-8 py-4 border-2 border-neon-blue text-neon-blue font-semibold rounded-lg hover:bg-neon-blue hover:text-space-dark transition-all duration-300 focus-ring"
                >
                  <Database className="w-5 h-5" />
                  <span>Explore Missions</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  href="/contact"
                  className="group flex items-center space-x-2 px-8 py-4 border-2 border-neon-green text-neon-green font-semibold rounded-lg hover:bg-neon-green hover:text-space-dark transition-all duration-300 focus-ring"
                >
                  <Users className="w-5 h-5" />
                  <span>Contact Ground Control</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-neon-green mb-2">12+</div>
                <div className="text-gray-400 text-sm">Data Missions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-neon-blue mb-2">10+</div>
                <div className="text-gray-400 text-sm">Tools Mastered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-neon-purple mb-2">2</div>
                <div className="text-gray-400 text-sm">Internship Experiences</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-mission-orange mb-2">8.6</div>
                <div className="text-gray-400 text-sm">CGPA</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Brief */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Mission Brief
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                As an AI Enthusiast and Developer, I specialize in building intelligent systems that solve complex real-world problems. 
                From developing RAG chatbots and AI-powered study roadmap generators to exploring biometrics and music AI applications, 
                every project pushes the boundaries of what's possible with artificial intelligence and machine learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/experience"
                  className="flex items-center space-x-2 px-6 py-3 bg-space-blue/20 text-neon-blue rounded-lg hover:bg-space-blue/30 transition-colors focus-ring"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Mission Logs</span>
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center space-x-2 px-6 py-3 bg-space-blue/20 text-neon-blue rounded-lg hover:bg-space-blue/30 transition-colors focus-ring"
                >
                  <Play className="w-4 h-4" />
                  <span>Read Transmissions</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default HomePage;
