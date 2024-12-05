import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { StockData } from '@/types/stock';

interface Props {
  data: StockData;
}

const StockDetail: React.FC<Props> = ({ data }) => {
  const chartData = data.stock_data.prices.map((price, index) => ({
    date: new Date(data.stock_data.dates[index] / 1000000).toLocaleDateString(),
    price
  }));

  return (
    <div className="p-6 bg-white/10 rounded-xl border border-cyan-500/20 space-y-6 text-white">
      {/* Header Section */}
      <div className="border-b border-cyan-500/20 pb-4">
        <h1 className="text-2xl font-bold">{data.symbol}</h1>
        <p className="text-gray-300">อุตสาหกรรม: {data.industry}</p>
      </div>

      {/* Price Chart */}
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.1)" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={['auto', 'auto']}
              tick={{ fontSize: 12, fill: "#94a3b8" }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#06b6d4"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-cyan-500/5 rounded-lg border border-cyan-500/20">
          <h3 className="font-semibold text-cyan-400">ข้อมูลพื้นฐาน</h3>
          <ul className="space-y-2 mt-2 text-gray-300">
            <li>ราคา: ฿{data.financial_metrics.basic_metrics.price}</li>
            <li>P/E: {data.financial_metrics.basic_metrics.pe_ratio}</li>
            <li>P/B: {data.financial_metrics.basic_metrics.pb_ratio}</li>
            <li>ROE: {(data.financial_metrics.basic_metrics.roe * 100).toFixed(2)}%</li>
          </ul>
        </div>

        <div className="p-4 bg-cyan-500/5 rounded-lg border border-cyan-500/20">
          <h3 className="font-semibold text-cyan-400">ตัวชี้วัดทางเทคนิค</h3>
          <ul className="space-y-2 mt-2 text-gray-300">
            <li>RSI: {data.financial_metrics.technical_indicators.rsi.toFixed(2)}</li>
            <li>MACD: {data.financial_metrics.technical_indicators.macd.toFixed(2)}</li>
            <li>MA20: {data.financial_metrics.technical_indicators.moving_averages.ma20}</li>
            <li>MA50: {data.financial_metrics.technical_indicators.moving_averages.ma50}</li>
          </ul>
        </div>

        <div className="p-4 bg-cyan-500/5 rounded-lg border border-cyan-500/20">
          <h3 className="font-semibold text-cyan-400">ความเสี่ยง</h3>
          <ul className="space-y-2 mt-2 text-gray-300">
            <li>Volatility: {(data.financial_metrics.risk_metrics.volatility * 100).toFixed(2)}%</li>
            <li>Sharpe Ratio: {data.financial_metrics.risk_metrics.sharpe_ratio.toFixed(2)}</li>
            <li>Sortino Ratio: {data.financial_metrics.risk_metrics.sortino_ratio.toFixed(2)}</li>
          </ul>
        </div>
      </div>

      {/* Recommendations & Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-cyan-500/5 rounded-lg border border-cyan-500/20">
          <h3 className="font-semibold text-cyan-400">คำแนะนำ AI</h3>
          <p className="mt-2 text-gray-300">{data.ai_recommendations}</p>
        </div>
        
        <div className="p-4 bg-cyan-500/5 rounded-lg border border-cyan-500/20">
          <h3 className="font-semibold text-cyan-400">หัวข้อศึกษา</h3>
          <ul className="list-disc list-inside mt-2 text-gray-300">
            {data.study_topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Peer Companies */}
      <div className="p-4 bg-cyan-500/5 rounded-lg border border-cyan-500/20">
        <h3 className="font-semibold text-cyan-400">บริษัทในกลุ่มอุตสาหกรรมเดียวกัน</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {data.peer_companies.map((company, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/20"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockDetail;