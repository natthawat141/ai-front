// app/dev/data/system-info.ts

export const systemRequirements = {
    hardware: {
      ram: "32GB recommended",
      vram: "20GB minimum for Transformer models",
      cpu: "High-performance CPU required (16+ cores recommended)",
      storage: "50GB SSD minimum",
      gpu: "NVIDIA GPU with 20GB+ VRAM (A5000/A6000 recommended)"
    },
    environment: {
      python: "3.9+",
      node: "16+",
      cuda: "11.8+",
      docker: "Latest stable version"
    }
  };
  
  export const architectureInfo = {
    frontend: {
      framework: "Next.js 15 (App Router)",
      version: "0.1.0 (Alpha)",
      ui: {
        mainLibraries: ["TailwindCSS", "Framer Motion", "Chart.js", "Radix UI"],
        themingSystem: "Custom design system with dark mode support",
        components: "Modular component architecture with TypeScript"
      },
      keyFeatures: [
        "Real-time financial data visualization",
        "Interactive charts and graphs",
        "Responsive design with animations",
        "Dark mode optimized for financial data",
        "Documentation with Nextra"
      ]
    },
    backend: {
      framework: "FastAPI",
      deployment: "RunPod GPU Serverless",
      mainComponents: {
        financialAnalyzer: "Core analysis engine using transformers",
        marketData: "Market data fetching and caching system",
        pdfProcessor: "PDF extraction with OCR capabilities",
        aiEngine: "Integration with Typhoon API"
      },
      performance: {
        concurrency: "81 workers",
        caching: "In-memory caching for market data",
        rateLimit: "1000 requests/minute"
      }
    }
  };
  
  export const codeMetrics = {
    backend: {
      totalClasses: 4,
      mainClasses: [
        {
          name: "AdvancedFinancialAnalyzer",
          methods: 25,
          responsibility: "Core financial analysis and AI processing"
        },
        {
          name: "MarketData",
          methods: 3,
          responsibility: "Stock market data management"
        },
        {
          name: "SetSmartAnalyzer",
          methods: 5,
          responsibility: "SET SMART specific analysis"
        }
      ],
      dataClasses: [
        "FinancialMetrics",
        "IndustryAnalysis",
        "FinancialData"
      ]
    },
    frontend: {
      components: {
        total: 15,
        major: [
          "AnalysisResult",
          "ChatInterface",
          "FileUpload",
          "DataVisualization"
        ]
      },
      pages: 4,
      hooks: 6
    }
  };
  
  export const integrations = {
    typhoonAPI: {
      version: "1.5",
      endpoints: [
        "chat/completions",
        "analysis/summary",
        "classification"
      ],
      features: [
        "Zero-shot classification",
        "Financial text analysis",
        "Market sentiment analysis"
      ]
    },
    runpod: {
      type: "GPU Serverless",
      specs: {
        gpu: "NVIDIA A6000",
        memory: "48GB VRAM",
        scalability: "Auto-scaling enabled"
      },
      deployment: {
        url: "censor",
        region: "us-east-1"
      }
    }
  };