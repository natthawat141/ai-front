// AnalysisResult.tsx
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { FiTrendingUp, FiAlertCircle, FiBarChart2, FiTarget } from 'react-icons/fi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Types
interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value?: string | number;
  change?: number;
  className?: string;
}

interface AnalysisData {
  symbol?: string;
  industry?: string;
  stock_data?: {
    dates?: number[];
    prices?: number[];
  };
  financial_metrics?: {
    basic_metrics?: {
      price?: number;
      pe_ratio?: number;
    };
    technical_indicators?: {
      rsi?: number;
    };
    risk_metrics?: {
      volatility?: number;
    };
  };
  ai_recommendations?: string;
  peer_companies?: string[];
}

// Utility Functions
const formatNumber = (value?: number, decimals = 2): string => {
  if (value === undefined || value === null || isNaN(value)) return 'N/A';
  return value.toFixed(decimals);
};

const formatCurrency = (value?: number): string => {
  if (value === undefined || value === null || isNaN(value)) return 'N/A';
  return `฿${value.toFixed(2)}`;
};

const formatDate = (timestamp?: number): string => {
  if (!timestamp) return '';
  try {
    return new Date(timestamp/1000000).toLocaleDateString();
  } catch {
    return 'Invalid Date';
  }
};

// Components
const MetricCard: React.FC<MetricCardProps> = ({ 
  icon: Icon, 
  title, 
  value = 'N/A', 
  change, 
  className = "" 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 ${className}`}
  >
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-cyan-400" />
      <div>
        <p className="text-white/60 text-sm">{title}</p>
        <p className="text-white text-lg font-semibold">{value}</p>
        {change !== undefined && (
          <p className={`text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
          </p>
        )}
      </div>
    </div>
  </motion.div>
);

// Chart Error Boundary
class ChartErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError() {
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        return (
          <div className="h-full flex items-center justify-center text-white/60">
            <p>Unable to load chart</p>
          </div>
        );
      }
      return this.props.children;
    }
  }
// Main Component
const AnalysisResult: React.FC<{ data?: AnalysisData }> = ({ data }) => {
  if (!data) {
    return (
      <div className="text-center text-white/60 p-6">
        No analysis data available
      </div>
    );
  }

  const chartData = React.useMemo(() => {
    if (!data.stock_data?.dates || !data.stock_data?.prices) return null;
    
    return {
      labels: data.stock_data.dates.map(formatDate),
      datasets: [
        {
          label: `${data.symbol || 'Stock'} Price`,
          data: data.stock_data.prices,
          borderColor: 'rgb(6, 182, 212)',
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          tension: 0.4,
          fill: true,
        }
      ]
    };
  }, [data.stock_data, data.symbol]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.9)',
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: 'rgba(255, 255, 255, 0.7)' }
      },
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">
            {data.symbol || 'Stock Analysis'}
          </h2>
          <p className="text-white/60">
            {data.industry || 'Industry not specified'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-white/60">Data sources:</p>
          <p className="text-sm text-cyan-400">yfinance & SET SMART</p>
        </div>
      </div>

      {/* Price Chart */}
      {chartData && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10"
        >
          <h3 className="text-white/90 mb-4">Price History</h3>
          <div className="h-[400px]">
            <ChartErrorBoundary>
              <Line data={chartData} options={chartOptions} />
            </ChartErrorBoundary>
          </div>
        </motion.div>
      )}

      {/* Metrics Grid */}
      {data.financial_metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={FiTrendingUp}
            title="Current Price"
            value={formatCurrency(data.financial_metrics.basic_metrics?.price)}
          />
          <MetricCard
            icon={FiBarChart2}
            title="P/E Ratio"
            value={formatNumber(data.financial_metrics.basic_metrics?.pe_ratio)}
          />
          <MetricCard
            icon={FiTarget}
            title="RSI"
            value={formatNumber(data.financial_metrics.technical_indicators?.rsi)}
          />
          <MetricCard
            icon={FiAlertCircle}
            title="Volatility"
            value={`${formatNumber(
              data.financial_metrics.risk_metrics?.volatility 
                ? data.financial_metrics.risk_metrics.volatility * 100 
                : undefined
            )}%`}
          />
        </div>
      )}

      {/* AI Analysis */}
      {data.ai_recommendations && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
        >
          <h3 className="text-white/90 mb-4">AI Analysis</h3>
          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 whitespace-pre-wrap">
              {data.ai_recommendations}
            </p>
          </div>
        </motion.div>
      )}

      {/* Peer Companies */}
      {data.peer_companies?.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
        >
          <h3 className="text-white/90 mb-4">Peer Companies</h3>
          <div className="flex flex-wrap gap-2">
            {data.peer_companies.map((company, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm"
              >
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Show error if no meaningful data */}
      {!chartData && !data.financial_metrics && !data.ai_recommendations && (
        <div className="text-center text-white/60 p-6">
          <p>Insufficient data for analysis</p>
          <p className="text-sm mt-2">Try uploading a different document or checking the data source</p>
        </div>
      )}
    </motion.div>
  );
};

export default AnalysisResult;