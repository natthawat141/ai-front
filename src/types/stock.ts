export interface StockData {
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
  }