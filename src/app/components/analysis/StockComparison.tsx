// components/analysis/StockComparison.tsx
'use client'

import React from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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

interface PeerCompanies {
  symbols: string[];
  details: Record<string, any>;
  comparison: {
    basic_metrics: Record<string, {
      market_cap: number;
      current_price: number;
      volume: number;
    }>;
    valuation_metrics: Record<string, {
      pe_ratio: number;
      pb_ratio: number;
      dividend_yield: number;
    }>;
    performance_metrics: Record<string, {
      '1month_return': number;
      '52week_high': number;
      '52week_low': number;
    }>;
  };
}

interface StockComparisonProps {
  data: PeerCompanies;
}

const formatCurrency = (value?: number) => {
  if (!value) return 'N/A';
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

const formatNumber = (value?: number, decimals = 2) => {
  if (!value) return 'N/A';
  return value.toLocaleString('th-TH', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

const formatPercentage = (value?: number) => {
  if (!value) return 'N/A';
  return `${formatNumber(value)}%`;
};

const StockComparison: React.FC<StockComparisonProps> = ({ data }) => {
  const { symbols, comparison } = data;

  const chartData = {
    labels: symbols,
    datasets: [
      {
        label: 'ราคาปัจจุบัน',
        data: symbols.map(symbol => comparison.basic_metrics[symbol]?.current_price),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'P/E Ratio',
        data: symbols.map(symbol => comparison.valuation_metrics[symbol]?.pe_ratio),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y1',
      },
    ]
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'ราคา (บาท)',
          color: 'rgba(255, 255, 255, 0.7)'
        },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: 'rgba(255, 255, 255, 0.7)' }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'P/E Ratio',
          color: 'rgba(255, 255, 255, 0.7)'
        },
        grid: {
          drawOnChartArea: false,
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: { color: 'rgba(255, 255, 255, 0.7)' }
      },
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: 'rgba(255, 255, 255, 0.7)' }
      }
    },
    plugins: {
      legend: {
        labels: { color: 'rgba(255, 255, 255, 0.9)' }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">การเปรียบเทียบหุ้นในกลุ่ม</h2>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
      >
        <div className="h-[400px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </motion.div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-x-auto"
      >
        <table className="w-full text-white">
          <thead>
            <tr className="bg-white/5">
              <th className="px-4 py-2 text-left">หุ้น</th>
              <th className="px-4 py-2 text-right">ราคา</th>
              <th className="px-4 py-2 text-right">P/E Ratio</th>
              <th className="px-4 py-2 text-right">P/B Ratio</th>
              <th className="px-4 py-2 text-right">Dividend Yield</th>
              <th className="px-4 py-2 text-right">Market Cap</th>
              <th className="px-4 py-2 text-right">Volume</th>
            </tr>
          </thead>
          <tbody>
            {symbols.map((symbol) => (
              <tr key={symbol} className="border-t border-white/10 hover:bg-white/5">
                <td className="px-4 py-2">{symbol}</td>
                <td className="px-4 py-2 text-right">
                  {formatCurrency(comparison.basic_metrics[symbol]?.current_price)}
                </td>
                <td className="px-4 py-2 text-right">
                  {formatNumber(comparison.valuation_metrics[symbol]?.pe_ratio)}
                </td>
                <td className="px-4 py-2 text-right">
                  {formatNumber(comparison.valuation_metrics[symbol]?.pb_ratio)}
                </td>
                <td className="px-4 py-2 text-right">
                  {formatPercentage(comparison.valuation_metrics[symbol]?.dividend_yield)}
                </td>
                <td className="px-4 py-2 text-right">
                  {formatCurrency(comparison.basic_metrics[symbol]?.market_cap)}
                </td>
                <td className="px-4 py-2 text-right">
                  {formatNumber(comparison.basic_metrics[symbol]?.volume)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default StockComparison;