// app/components/QuickPdfSelector.tsx
'use client'

import { motion } from 'framer-motion'
import { FileText, BarChart2, LineChart } from 'lucide-react'
import { cn } from '@/lib/utils' // utility for merging tailwind classes

// Define available brand colors
type BrandColor = 'kbank' | 'scb' | 'cyan'

// Props interface for QuickPdfSelector component
interface QuickPdfSelectorProps {
  onSelectPdf: (pdfName: string) => void
}

// Props interface for PDFButton component
interface PDFButtonProps {
  icon: React.ElementType
  label: string
  onClick: () => void
  color?: BrandColor
}

// PDF file type interface
interface PDFFile {
  name: string
  label: string
  icon: React.ElementType
  color: BrandColor
}

// Brand color configurations
const colorConfig: Record<BrandColor, {
  text: string
  background: string
  hover: string
}> = {
  kbank: {
    text: 'text-[#17A150]',
    background: 'bg-[#17A150]/10',
    hover: 'group-hover:text-[#17A150]'
  },
  scb: {
    text: 'text-[#4E2B82]',
    background: 'bg-[#4E2B82]/10',
    hover: 'group-hover:text-[#F8B615]'
  },
  cyan: {
    text: 'text-cyan-400',
    background: 'bg-cyan-500/10',
    hover: 'group-hover:text-cyan-400'
  }
}

const PDFButton: React.FC<PDFButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  color = 'cyan'
}) => {
  const brandColor = colorConfig[color]

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-3 group",
        "transition-all duration-200 ease-in-out"
      )}
    >
      <motion.div 
        className="relative w-12 h-12 flex items-center justify-center"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <div className={cn(
          "absolute inset-0 rounded-xl blur-md",
          brandColor.background
        )} />
        <Icon className={cn(
          "w-8 h-8 relative z-10",
          brandColor.text
        )} />
      </motion.div>
      <span className={cn(
        "text-sm text-white/70 transition-colors",
        brandColor.hover
      )}>
        {label}
      </span>
    </motion.button>
  )
}

export const QuickPdfSelector: React.FC<QuickPdfSelectorProps> = ({ onSelectPdf }) => {
  // PDF files configuration
  const quickPDFs: PDFFile[] = [
    {
        name: '/img/KBank_Investor_Presentation_3Q24.pdf', // ถ้าไฟล์อยู่ใน public/img/
        label: 'KBank Q3 2024',
        icon: FileText,
        color: 'kbank'
      },
      {
        name: '/img/sbcx.pdf',  // ถ้าไฟล์อยู่ใน public/img/
        label: 'SCB Report',
        icon: BarChart2,
        color: 'scb'
      },
      {
        name: '/img/k.pdf',  // ถ้าไฟล์อยู่ใน public/img/
        label: 'KBank 2023',
        icon: LineChart,
        color: 'kbank'
      }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "w-full max-w-2xl mx-auto flex justify-center gap-8",
        "flex gap-8"
      )}
    >
      {quickPDFs.map((pdf) => (
        <PDFButton
          key={pdf.name}
          icon={pdf.icon}
          label={pdf.label}
          color={pdf.color}
          onClick={() => onSelectPdf(pdf.name)}
        />
      ))}
    </motion.div>
  )
}
