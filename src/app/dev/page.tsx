'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import { PackageSection } from './components/PackageSection';
import { backendInfo, systemRequirements } from './data/backend-info';

const DevDocumentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#020817] to-slate-950">
      <Navbar />
      <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(56,189,248,0.13)_0%,rgba(56,189,248,0)_100%)]" />
      <div className="container mx-auto px-4 py-16 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Backend Development Documentation
          </h1>
          <p className="text-white/60">
            Overview of dependencies and technologies used in our backend
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-16">
          {backendInfo.map((section, index) => (
            <PackageSection
              key={`${section.title.en}-${index}`}
              section={section}
              index={index}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 p-6 bg-[#0A0F1A] backdrop-blur-sm rounded-xl border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">
            System Requirements
          </h2>
          <ul className="space-y-2 text-gray-400">
            <li>• Python {systemRequirements.environment.python}</li>
            <li>• Node.js {systemRequirements.environment.node}</li>
            <li>• {systemRequirements.hardware.ram}</li>
            <li>• Tesseract OCR Engine</li>
            <li>• joeddav/xlm-roberta-large-xnli</li>
            <li>• typhoon-v1.5-instruct</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DevDocumentation;