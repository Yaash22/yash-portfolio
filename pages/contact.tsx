import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <>
      <Head>
        <title>Open Channel — Mission Control</title>
        <meta name="description" content="Contact Mission Control for collaboration opportunities" />
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
                Open Channel
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Ready to collaborate on your next mission? Let's establish communication.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-space-gray/50 backdrop-blur-sm border border-space-blue/20 rounded-lg p-8"
            >
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-neon-green/20 border border-neon-green/50 rounded-lg flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-neon-green" />
                  <span className="text-neon-green font-medium">
                    Message transmitted successfully! Ground Control will respond within 24 hours.
                  </span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center space-x-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-medium">
                    Transmission failed. Please check your connection and try again.
                  </span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-space-dark border rounded-lg text-white placeholder-gray-400 focus:outline-none focus-ring ${
                      errors.name ? 'border-red-500' : 'border-space-blue/20 focus:border-neon-green'
                    }`}
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-400 text-sm">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-space-dark border rounded-lg text-white placeholder-gray-400 focus:outline-none focus-ring ${
                      errors.email ? 'border-red-500' : 'border-space-blue/20 focus:border-neon-green'
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-400 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-white font-semibold mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-space-dark border rounded-lg text-white placeholder-gray-400 focus:outline-none focus-ring ${
                      errors.subject ? 'border-red-500' : 'border-space-blue/20 focus:border-neon-green'
                    }`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-red-400 text-sm">{errors.subject}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-white font-semibold mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-space-dark border rounded-lg text-white placeholder-gray-400 focus:outline-none focus-ring resize-none ${
                      errors.message ? 'border-red-500' : 'border-space-blue/20 focus:border-neon-green'
                    }`}
                    placeholder="Describe your mission or collaboration opportunity..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-red-400 text-sm">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-lg font-semibold transition-all duration-300 focus-ring ${
                      isSubmitting
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-neon-blue to-neon-green text-space-dark hover:shadow-lg hover:shadow-neon-blue/25'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Transmit Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-8">
                Alternative Communication Channels
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-space-gray/30 border border-space-blue/20 rounded-lg p-6">
                  <Mail className="w-8 h-8 text-neon-blue mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                  <p className="text-gray-400 mb-4">Direct communication channel</p>
                <a
                  href="mailto:allampalliyash@gmail.com"
                  className="text-neon-green hover:text-neon-blue transition-colors"
                >
                  allampalliyash@gmail.com
                </a>
                </div>
                
                <div className="bg-space-gray/30 border border-space-blue/20 rounded-lg p-6">
                  <User className="w-8 h-8 text-neon-green mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">LinkedIn</h3>
                  <p className="text-gray-400 mb-4">Professional network</p>
                  <a
                    href="https://www.linkedin.com/in/yash-allampalli/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-green hover:text-neon-blue transition-colors"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
                
                <div className="bg-space-gray/30 border border-space-blue/20 rounded-lg p-6">
                  <MessageSquare className="w-8 h-8 text-neon-purple mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">GitHub</h3>
                  <p className="text-gray-400 mb-4">Code collaboration</p>
                  <a
                    href="https://github.com/Yaash22"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-green hover:text-neon-blue transition-colors"
                  >
                    View Projects
                  </a>
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

export default ContactPage;
