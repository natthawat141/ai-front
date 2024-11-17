'use client'

import React from 'react';
import { motion } from 'framer-motion';

const BackendDoc = () => {
  const technologies = [
    {
      category: "Core Framework & APIs",
      items: [
        {
          name: "FastAPI",
          description: "Python web framework สำหรับสร้าง API endpoints พร้อม automatic OpenAPI documentation"
        },
        {
          name: "Typhoon API v1.5",
          description: "AI API สำหรับการวิเคราะห์ข้อความและให้คำแนะนำการลงทุน"
        },
        {
          name: "SET SMART API", 
          description: "API สำหรับดึงข้อมูลหุ้นจากตลาดหลักทรัพย์"
        }
      ]
    },
    {
      category: "Data Analysis & Machine Learning",
      items: [
        {
          name: "yfinance",
          description: "Library สำหรับดึงข้อมูลหุ้นจาก Yahoo Finance"
        },
        {
          name: "NumPy",
          description: "Library สำหรับการคำนวณทางคณิตศาสตร์และการจัดการ Array"
        },
        {
          name: "PyMuPDF (fitz)",
          description: "Library สำหรับอ่านและประมวลผลไฟล์ PDF"
        },
        {
          name: "Tesseract OCR",
          description: "Engine สำหรับแปลงรูปภาพเป็นข้อความ"
        },
        {
          name: "Transformers",
          description: "Library สำหรับ NLP โดยใช้โมเดล xlm-roberta-large-xnli"
        },
        {
          name: "PyThaiNLP",
          description: "Library สำหรับประมวลผลภาษาไทย"
        }
      ]
    },
    {
      category: "Data Classes & Models",
      items: [
        {
          name: "FinancialMetrics",
          description: "เก็บข้อมูลตัวชี้วัดทางการเงิน (Basic, Technical, Risk, Statistical)"
        },
        {
          name: "FinancialData",
          description: "เก็บข้อมูลหุ้น (ราคา, ผลตอบแทน, ปริมาณการซื้อขาย)"
        },
        {
          name: "IndustryAnalysis",
          description: "เก็บข้อมูลการวิเคราะห์อุตสาหกรรม"
        }
      ]
    },
    {
      category: "Key Features",
      items: [
        {
          name: "Stock Analysis",
          description: "วิเคราะห์หุ้นใน SET SMART ด้วยตัวชี้วัดหลากหลาย"
        },
        {
          name: "PDF Processing",
          description: "ดึงและวิเคราะห์ข้อมูลจากรายงานการเงินในรูปแบบ PDF"
        },
        {
          name: "AI Chat",
          description: "ระบบแชทอัจฉริยะด้วย Typhoon API สำหรับให้คำแนะนำการลงทุน"
        },
        {
          name: "Technical Analysis",
          description: "คำนวณ indicators ทางเทคนิค (RSI, MACD, Bollinger Bands)"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#020817] to-slate-950 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-8">Backend Technologies</h1>
          
          {technologies.map((category, index) => (
            <motion.div 
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">{category.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((item) => (
                  <div 
                    key={item.name}
                    className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                  >
                    <h3 className="text-lg font-medium text-white mb-2">{item.name}</h3>
                    <p className="text-white/60">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BackendDoc;