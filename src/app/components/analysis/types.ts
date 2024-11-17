// components/analysis/types.ts
export interface MetricCardProps {
    icon: React.ElementType;
    title: string;
    value: string | number;
    change?: number;
    className?: string;
  }
  
  // types.ts
export interface FinancialMetrics {
    basic_metrics?: {
      price?: number | null;
      pe_ratio?: number | null;
      pb_ratio?: number | null;
      market_cap?: number | null;
    } | null;
    technical_indicators?: {
      rsi?: number | null;
      macd?: number | null;
    } | null;
    risk_metrics?: {
      volatility?: number | null;
      sharpe_ratio?: number | null;
    } | null;
  }
  
  export interface AnalysisData {
    symbol?: string;
    industry?: string;
    stock_data?: {
      dates: number[];
      prices: number[];
    } | null;
    financial_metrics?: FinancialMetrics | null;
    ai_recommendations?: string;
    peer_companies?: string[];
    data_source?: string;
  }