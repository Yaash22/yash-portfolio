import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Rocket, Satellite, Database, FileText, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navigation: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Mission Launch', icon: Rocket },
    { href: '/about', label: 'Telemetry', icon: Satellite },
    { href: '/experience', label: 'Ground Control', icon: Database },
    { href: '/projects', label: 'Data Missions', icon: FileText },
    { href: '/blog', label: 'Transmission Logs', icon: FileText },
    { href: '/contact', label: 'Open Channel', icon: Mail },
  ];

  const isActive = (href: string) => {
    return router.pathname === href;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-space-dark/90 backdrop-blur-sm border-b border-space-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-green rounded-full flex items-center justify-center">
              <Rocket className="w-5 h-5 text-space-dark" />
            </div>
            <span className="text-xl font-bold text-white font-mono">
              Mission Control
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 focus-ring ${
                    isActive(item.href)
                      ? 'text-neon-green bg-space-blue/10'
                      : 'text-gray-300 hover:text-white hover:bg-space-blue/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus-ring p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-space-gray/50 rounded-lg mt-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 focus-ring ${
                      isActive(item.href)
                        ? 'text-neon-green bg-space-blue/10'
                        : 'text-gray-300 hover:text-white hover:bg-space-blue/5'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
