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
interface PeerCompany {
  id: string;
  name: string;
}

interface StockData {
  dates: number[];
  prices: number[];
}

interface FinancialMetrics {
  basic_metrics: {
    price: number | null;
    pe_ratio: number | null;
    pb_ratio: number | null;
    market_cap: number | null;
  };
  technical_indicators: {
    rsi: number | null;
    macd: number | null;
  };
  risk_metrics: {
    volatility: number | null;
    sharpe_ratio: number | null;
  };
}

interface AnalysisData {
  symbol: string;
  industry: string;
  stock_data: StockData | null;
  financial_metrics: FinancialMetrics | null;
  ai_recommendations: string | null;
  peer_companies: PeerCompany[];
  data_source: string;
}

interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  change?: number;
  className?: string;
}

// Utility Functions
const formatNumber = (value: number | null, decimals = 2): string => {
  if (value === null || isNaN(value)) return 'N/A';
  return value.toFixed(decimals);
};

const formatCurrency = (value: number | null): string => {
  if (value === null || isNaN(value)) return 'N/A';
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

// Error Boundary Component
// Error Boundary Component
interface ChartErrorBoundaryProps {
  children: React.ReactNode;
}

interface ChartErrorBoundaryState {
  hasError: boolean;
}

class ChartErrorBoundary extends React.Component<ChartErrorBoundaryProps, ChartErrorBoundaryState> {
  constructor(props: ChartErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ChartErrorBoundaryState {
    console.error('ChartError:', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Chart error details:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="h-full flex items-center justify-center">
          <div className="text-center text-white/60 p-6">
            <p className="text-lg">Unable to load chart</p>
            <p className="text-sm mt-2">Please try refreshing the page</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main Component
const AnalysisResult: React.FC<{ data: AnalysisData }> = ({ 
  data = {
    symbol: 'Unknown',
    industry: 'Unknown',
    stock_data: null,
    financial_metrics: null,
    ai_recommendations: null,
    peer_companies: [],
    data_source: 'Unknown'
  }
}) => {
  // Type Guards
  const hasValidStockData = (data: AnalysisData): data is AnalysisData & { stock_data: StockData } => {
    return data.stock_data !== null && 
           Array.isArray(data.stock_data.dates) && 
           Array.isArray(data.stock_data.prices) &&
           data.stock_data.dates.length > 0 &&
           data.stock_data.prices.length === data.stock_data.dates.length;
  };

  const hasFinancialMetrics = (data: AnalysisData): boolean => {
    return data.financial_metrics !== null;
  };

  // Chart Configuration
  const chartData = React.useMemo(() => {
    if (!hasValidStockData(data)) return null;
    
    return {
      labels: data.stock_data.dates.map(formatDate),
      datasets: [{
        label: `${data.symbol} Price`,
        data: data.stock_data.prices,
        borderColor: 'rgb(6, 182, 212)',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        tension: 0.4,
        fill: true,
      }]
    };
  }, [data]);

  const chartOptions = React.useMemo(() => ({
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
  }), []);

  const MetricCard: React.FC<MetricCardProps> = ({ 
    icon: Icon, 
    title, 
    value, 
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
          <h2 className="text-3xl font-bold text-white">{data.symbol}</h2>
          <p className="text-white/60">{data.industry}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-white/60">Data source:</p>
          <p className="text-sm text-cyan-400">{data.data_source}</p>
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
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
  >
    <MetricCard
      icon={FiDollarSign}
      title="Current Price"
      value={formatCurrency(data.financial_metrics?.basic_metrics?.price ?? null)}
    />
    <MetricCard
      icon={FiPieChart}
      title="P/E Ratio"
      value={formatNumber(data.financial_metrics?.basic_metrics?.pe_ratio ?? null)}
    />
    <MetricCard
      icon={FiActivity}
      title="RSI"
      value={formatNumber(data.financial_metrics?.technical_indicators?.rsi ?? null)}
    />
    <MetricCard
      icon={FiPercent}
      title="Volatility"
      value={`${formatNumber(
        data.financial_metrics?.risk_metrics?.volatility !== null
          ? data.financial_metrics.risk_metrics.volatility * 100
          : null
      )}%`}
    />
  </motion.div>
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
      {data.peer_companies.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
        >
          <h3 className="text-white/90 mb-4">Peer Companies</h3>
          <div className="flex flex-wrap gap-2">
            {data.peer_companies.map(({ id, name }) => (
              <span 
                key={id}
                className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Show error if no meaningful data */}
      {!chartData && !hasFinancialMetrics(data) && !data.ai_recommendations && (
        <div className="text-center text-white/60 p-6">
          <p>Insufficient data for analysis</p>
          <p className="text-sm mt-2">
            Try uploading a different document or checking the data source
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default AnalysisResult;

