// app/src/apis/page.tsx
'use client'

import React from 'react'
import Navbar from '../dev/components/Navbar'

const APIShapePage = () => {
  return (
    <>
    <Navbar/>
   
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#020817] to-slate-950 p-8">
      
      <div className="max-w-4xl mx-auto space-y-8">
      
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Financial Analysis API</h1>
          <p className="text-white/75">POST /analyze - PDF Financial Document Analysis</p>
        </div>

        {/* Request Section */}
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">Request</h2>
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <pre className="text-white/90 overflow-x-auto">
              {`POST https://xawfeg5xdu3cnj-7860.proxy.runpod.net/analyze
Content-Type: multipart/form-data

formData: {
  file: File // PDF document
}`}
            </pre>
          </div>
        </div>

        {/* Response Section */}
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">Response</h2>
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <pre className="text-white/90 overflow-x-auto">
              {`{
  "result": {
    "symbol": string,          // e.g. "KBANK.BK"
    "industry": string,        // e.g. "ธนาคาร"
    "ai_recommendations": string,
    "study_topics": string[],  // Related study topics
    "peer_companies": string[], // Competitor symbols

    "financial_metrics": {
      "basic_metrics": {
        "price": number,
        "market_cap": number,
        "pe_ratio": number,
        "pb_ratio": number,
        "roe": number
      },
      "technical_indicators": {
        "rsi": number,
        "macd": number,
        "bollinger_bands": {
          "upper_band": number,
          "lower_band": number
        },
        "moving_averages": {
          "ma20": number,
          "ma50": number,
          "ma200": number
        }
      },
      "risk_metrics": {
        "volatility": number,
        "var_95": number,
        "cvar_95": number,
        "sharpe_ratio": number,
        "sortino_ratio": number
      },
      "statistical_metrics": Record<string, unknown>
    },

    "stock_data": {
      "prices": number[],     // Daily closing prices
      "dates": number[]       // Timestamps in nanoseconds
    }
  }
}`}
            </pre>
          </div>
        </div>

        {/* Example Usage Section */}
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">Example Usage</h2>
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <pre className="text-white/90 overflow-x-auto">
              {`// TypeScript/JavaScript
async function analyzePDF(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(
    'https://xawfeg5xdu3cnj-7860.proxy.runpod.net/analyze',
    {
      method: 'POST',
      body: formData
    }
  );

  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }

  return response.json();
}

// Usage
try {
  const file = new File(['...'], 'report.pdf', { 
    type: 'application/pdf' 
  });
  const { result } = await analyzePDF(file);
  console.log('Analysis:', result);
} catch (error) {
  console.error('Analysis failed:', error);
}`}
            </pre>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(56,189,248,0.13)_0%,rgba(56,189,248,0)_100%)]" />
        <div className="absolute top-20 right-20 w-40 h-40 bg-indigo-600/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-40 left-20 w-56 h-56 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>
    </div>
    </>
  )
}

export default APIShapePage