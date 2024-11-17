'use client'

import React from 'react';
import { motion } from 'framer-motion';
import type { PackageInfo } from './types';

export const PackageCard: React.FC<{ pkg: PackageInfo }> = ({ pkg }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10"
  >
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-white font-semibold">{pkg.name}</h3>
      <span className="text-cyan-400 text-sm">v{pkg.version}</span>
    </div>
    <p className="text-white/60 text-sm mb-3">{pkg.description}</p>
    {pkg.docs && (
      <a 
        href={pkg.docs}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
      >
        View Documentation →
      </a>
    )}
  </motion.div>
);