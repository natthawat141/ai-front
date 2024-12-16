'use client'

import React, { useState } from 'react'

interface AnalysisResult {
  result: {
    symbol: string;
    industry: string;
    ai_recommendations: string;
    study_topics: string[];
    peer_companies: string[];
    financial_metrics: {
      basic_metrics: {
        price: number;
        market_cap: number;
        pe_ratio: number;
        pb_ratio: number;
        roe: number;
      };
      technical_indicators: {
        rsi: number;
        macd: number;
        bollinger_bands: {
          upper_band: number;
          lower_band: number;
        };
        moving_averages: {
          ma20: number;
          ma50: number;
          ma200: number;
        };
      };
      risk_metrics: {
        volatility: number;
        var_95: number;
        cvar_95: number;
        sharpe_ratio: number;
        sortino_ratio: number;
      };
    };
    stock_data: {
      prices: number[];
      dates: number[];
    };
  };
}

const APITestPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setResult(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://1i6qnvu31fqaca-7860.proxy.runpod.net/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Upload failed');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-4">Financial Analysis API Tester</h1>
        <p className="text-center text-white/75 mb-8">Upload a PDF financial document to analyze</p>

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <input 
              accept=".pdf" 
              className="hidden" 
              id="file-upload" 
              type="file"
              onChange={handleFileChange}
            />
            <label 
              htmlFor="file-upload" 
              className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer transition-all group backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed h-[52px]"
            >
              <svg 
                stroke="currentColor" 
                fill="none" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5 text-white group-hover:text-cyan-400"
                height="1em" 
                width="1em" 
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span className="text-white/90 group-hover:text-white font-medium">
                {file ? file.name : 'Upload PDF'}
              </span>
            </label>

            {file && (
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-4 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed h-[52px]"
              >
                {loading ? 'Analyzing...' : 'Analyze PDF'}
              </button>
            )}
          </div>

          {error && (
            <div className="bg-red-500/10 text-red-400 p-4 rounded-xl mt-4">
              {error}
            </div>
          )}
        </form>

        {/* Results Display */}
        {result && (
          <div className="mt-8 bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
            <h2 className="text-xl font-semibold text-cyan-400 mb-4">Analysis Results</h2>
            <div className="bg-slate-900/50 p-4 rounded-lg overflow-x-auto">
              {/* Basic Info */}
              <div className="mb-6">
                <h3 className="text-white/90 font-medium mb-2">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/70">Symbol: <span className="text-white/90">{result.result.symbol}</span></p>
                    <p className="text-white/70">Industry: <span className="text-white/90">{result.result.industry}</span></p>
                  </div>
                  <div>
                    <p className="text-white/70">AI Recommendations:</p>
                    <p className="text-white/90">{result.result.ai_recommendations}</p>
                  </div>
                </div>
              </div>

              {/* Full JSON */}
              <div>
                <h3 className="text-white/90 font-medium mb-2">Complete Analysis Data</h3>
                <pre className="text-white/90 whitespace-pre-wrap text-sm">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default APITestPage;