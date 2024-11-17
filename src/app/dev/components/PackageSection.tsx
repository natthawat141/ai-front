// app/dev/components/PackageSection.tsx
'use client'

/** @jsxImportSource react */
import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

interface Package {
  name: string;
  version: string;
  description: {
    en: string;
    th: string;
  };
  docs: string;
}

interface PackageSectionProps {
  section: {
    title: {
      en: string;
      th: string;
    };
    icon: any;
    packages: Package[];
  };
  index: number;
}

const PackageSection = ({ section, index }: PackageSectionProps): JSX.Element => {
  const Icon = section.icon;

  return React.createElement('div', { className: "relative" },
    React.createElement('div', { className: "flex items-center gap-3 mb-6" },
      React.createElement(Icon, { className: "w-6 h-6 text-blue-400" }),
      React.createElement('h2', { className: "text-2xl font-bold text-white" }, section.title.en)
    ),
    React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
      section.packages.map((pkg) => 
        React.createElement('div', { 
          key: pkg.name,
          className: "p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
        },
          React.createElement('div', { 
            className: "flex justify-between items-start mb-2" 
          },
            React.createElement('h3', { 
              className: "text-lg font-semibold text-white" 
            }, pkg.name),
            React.createElement('span', { 
              className: "text-sm text-blue-400" 
            }, pkg.version)
          ),
          React.createElement('p', { 
            className: "text-white/60 mb-4" 
          }, pkg.description.en),
          pkg.docs !== "Internal" && React.createElement('a', {
            href: pkg.docs,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          },
            "Documentation",
            React.createElement(FiExternalLink, { className: "w-4 h-4" })
          )
        )
      )
    )
  );
};

export { PackageSection };