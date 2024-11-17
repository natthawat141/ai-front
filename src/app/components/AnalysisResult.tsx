// components/AnalysisResult.tsx
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { 
  FiTrendingUp, 
  FiAlertCircle, 
  FiBarChart2, 
  FiTarget,
  FiDollarSign,
  FiPercent,
  FiActivity,
  FiPieChart 
} from 'react-icons/fi';
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
  value: string | number;
  change?: number;
  className?: string;
}

interface ChartDataPoint {
  date: number;
  value: number;
}

interface FinancialMetrics {
  basic_metrics: {
    price?: number;
    pe_ratio?: number;
    pb_ratio?: number;
    market_cap?: number;
  };
  technical_indicators: {
    rsi?: number;
    macd?: number;
  };
  risk_metrics: {
    volatility?: number;
    sharpe_ratio?: number;
  };
}

interface AnalysisData {
  symbol?: string;
  industry?: string;
  stock_data?: {
    dates: number[];
    prices: number[];
  };
  financial_metrics?: FinancialMetrics;
  ai_recommendations?: string;
  peer_companies?: string[];
  data_source?: string;
}

// Utility Functions
const formatNumber = (value: number | undefined, decimals = 2, prefix = ''): string => {
  if (value === undefined || isNaN(value)) return 'N/A';
  return `${prefix}${value.toFixed(decimals)}`;
};

const formatCurrency = (value: number | undefined): string => {
  if (value === undefined || isNaN(value)) return 'N/A';
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(value);
};

const formatDate = (timestamp: number): string => {
  try {
    return new Date(timestamp/1000000).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return 'Invalid Date';
  }
};

// Components
const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, title, value, change, className = "" }) => (
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

const AdditionalMetrics: React.FC<{ data: FinancialMetrics }> = ({ data }) => (
  <div className="grid grid-cols-2 gap-4 mt-4">
    <div className="text-white/60">
      <p>Market Cap:</p>
      <p className="text-white">
        {formatCurrency(data.basic_metrics?.market_cap)}
      </p>
    </div>
    <div className="text-white/60">
      <p>P/B Ratio:</p>
      <p className="text-white">
        {formatNumber(data.basic_metrics?.pb_ratio)}
      </p>
    </div>
    <div className="text-white/60">
      <p>MACD:</p>
      <p className="text-white">
        {formatNumber(data.technical_indicators?.macd)}
      </p>
    </div>
    <div className="text-white/60">
      <p>Sharpe Ratio:</p>
      <p className="text-white">
        {formatNumber(data.risk_metrics?.sharpe_ratio)}
      </p>
    </div>
  </div>
);

// Main Component
const AnalysisResult: React.FC<{ data: AnalysisData }> = ({ data }) => {
  // Validate required data
  const hasStockData = data?.stock_data?.dates?.length > 0 && data?.stock_data?.prices?.length > 0;
  const hasMetrics = data?.financial_metrics !== undefined;

  // Chart Configuration
  const chartData = hasStockData ? {
    labels: data.stock_data!.dates.map(formatDate),
    datasets: [
      {
        label: `${data.symbol || 'Stock'} Price`,
        data: data.stock_data!.prices,
        borderColor: 'rgb(6, 182, 212)',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  } : null;

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
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  if (!data) {
    return (
      <div className="text-center text-white/60 p-6">
        No analysis data available
      </div>
    );
  }

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
          <p className="text-sm text-cyan-400">
            {data.data_source || 'yfinance & SET SMART'}
          </p>
        </div>
      </div>

      {/* Price Chart */}
      {hasStockData && chartData && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10"
        >
          <h3 className="text-white/90 mb-4">Price History</h3>
          <div className="h-[400px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </motion.div>
      )}

      {/* Metrics Grid */}
      {hasMetrics && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              icon={FiDollarSign}
              title="Current Price"
              value={formatCurrency(data.financial_metrics?.basic_metrics?.price)}
            />
            <MetricCard
              icon={FiPieChart}
              title="P/E Ratio"
              value={formatNumber(data.financial_metrics?.basic_metrics?.pe_ratio)}
            />
            <MetricCard
              icon={FiActivity}
              title="RSI"
              value={formatNumber(data.financial_metrics?.technical_indicators?.rsi)}
            />
            <MetricCard
              icon={FiPercent}
              title="Volatility"
              value={formatNumber(
                data.financial_metrics?.risk_metrics?.volatility 
                  ? data.financial_metrics.risk_metrics.volatility * 100 
                  : undefined,
                2,
                ''
              ) + '%'}
            />
          </div>
          <AdditionalMetrics data={data.financial_metrics} />
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

      {/* Error Message */}
      {!hasStockData && !hasMetrics && !data.ai_recommendations && (
        <div className="text-center text-white/60 p-6">
          <p>Insufficient data for analysis</p>
          <p className="text-sm mt-2">Try uploading a different document or checking the data source</p>
        </div>
      )}
    </motion.div>
  );
};

export default AnalysisResult;