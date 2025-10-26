import React from 'react';
import { Rocket, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-space-gray border-t border-space-blue/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission Control Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-green rounded-full flex items-center justify-center">
                <Rocket className="w-5 h-5 text-space-dark" />
              </div>
              <span className="text-xl font-bold text-white font-mono">
                Mission Control
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Exploring the universe of data and AI. Building intelligent systems 
              that push the boundaries of what's possible.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Mission Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="text-gray-400 hover:text-neon-green transition-colors">
                  Telemetry Feed
                </a>
              </li>
              <li>
                <a href="/projects" className="text-gray-400 hover:text-neon-green transition-colors">
                  Data Missions
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-neon-green transition-colors">
                  Transmission Logs
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-neon-green transition-colors">
                  Open Channel
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Ground Control</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Yaash22"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-green transition-colors focus-ring p-2"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/yash-allampalli/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-green transition-colors focus-ring p-2"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:allampalliyash@gmail.com"
                className="text-gray-400 hover:text-neon-green transition-colors focus-ring p-2"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Ready to collaborate on your next mission?
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-space-blue/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Mission Control — Yash Allampalli. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Built with Next.js, TypeScript, and cosmic inspiration.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
