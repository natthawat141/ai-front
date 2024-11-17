// app/dev/components/Navbar.tsx
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FiBook, 
  FiCode, 
  FiGithub, 
  FiCpu,
  FiServer,
  FiLayout 
} from 'react-icons/fi';

const navigationItems = [
  { id: 'doc', href: "/dev", icon: FiBook, label: "Documentation" },
  { id: 'api', href: "/api-docs", icon: FiCode, label: "API " },
  { id: 'arch', href: "/architecture", icon: FiServer, label: "Architecture" },
  { id: 'sys', href: "/system", icon: FiCpu, label: "System" },
  { id: 'analysis', href: "/analysis", icon: FiLayout, label: "Analysis" }
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 backdrop-blur-sm border-b border-white/10 bg-black/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-white font-semibold flex items-center gap-2">
              <FiCode className="w-5 h-5" />
              <span>AI Financial Assistant</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="https://github.com/yourusername/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors p-2"
          >
            <FiGithub className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;