import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Search, Calendar, ArrowRight, FileText } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SearchResult } from '@/lib/types';

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [blogPosts] = useState([
    {
      id: 'building-scalable-rag-systems',
      title: 'Building Scalable RAG Systems: Lessons from Production',
      excerpt: 'After six months of building and deploying a Retrieval-Augmented Generation (RAG) system at Volvo, I\'ve learned valuable lessons about scaling AI systems in production environments.',
      published: '2024-01-15',
      readTime: '8 min read'
    },
    {
      id: 'anomaly-detection-satellite-perspective',
      title: 'Anomaly Detection in Time Series: A Satellite\'s Perspective',
      excerpt: 'Working on satellite telemetry anomaly detection has given me a unique perspective on time series analysis. Unlike traditional business metrics, satellite data presents challenges that require innovative approaches.',
      published: '2023-12-20',
      readTime: '6 min read'
    },
    {
      id: 'computer-vision-earth-observation',
      title: 'Computer Vision for Earth Observation: Beyond Image Classification',
      excerpt: 'Land use classification from satellite imagery might seem like a solved problem, but working on this project revealed the complexity hidden beneath the surface.',
      published: '2023-11-28',
      readTime: '10 min read'
    }
  ]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q: query }),
      });
      
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Head>
        <title>Transmission Logs — Mission Control</title>
        <meta name="description" content="Mission logs and technical insights from data science operations" />
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
                Transmission Logs
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Mission logs and technical insights from data science operations
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search transmission logs..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  className="w-full pl-12 pr-4 py-4 bg-space-gray/50 border border-space-blue/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-green focus-ring"
                />
                {isSearching && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-neon-green"></div>
                  </div>
                )}
              </div>
              
              {/* Search Results */}
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-space-gray/50 border border-space-blue/20 rounded-lg p-4"
                >
                  <h3 className="text-white font-semibold mb-3">Search Results</h3>
                  <div className="space-y-3">
                    {searchResults.map((result, index) => (
                      <div key={index} className="border-b border-space-blue/10 pb-3 last:border-b-0">
                        <div className="text-sm text-neon-blue font-medium mb-1">
                          From: {result.source}
                        </div>
                        <div className="text-gray-300 text-sm mb-2">
                          {result.snippet}
                        </div>
                        <div className="text-xs text-gray-400">
                          Relevance: {(result.score * 100).toFixed(1)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-space-gray/50 backdrop-blur-sm border border-space-blue/20 rounded-lg p-8 hover:border-neon-green/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.published)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-4 hover:text-neon-green transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-neon-blue">
                      <span className="text-sm font-medium">Read Full Transmission</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <span className="px-3 py-1 bg-neon-green/20 text-neon-green rounded-full text-xs font-medium">
                      Technical Log
                    </span>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mission Logs Summary */}
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
                Mission Logs Summary
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                These transmission logs document the journey through various data science missions, 
                sharing insights, challenges, and lessons learned along the way. Each log represents 
                a step forward in understanding the complex universe of data and AI.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-green mb-2">3</div>
                  <div className="text-gray-400">Published Logs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-blue mb-2">24</div>
                  <div className="text-gray-400">Minutes of Reading</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-purple mb-2">100%</div>
                  <div className="text-gray-400">Technical Accuracy</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default BlogPage;
