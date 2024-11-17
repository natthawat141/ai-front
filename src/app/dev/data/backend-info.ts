// app/dev/data/backend-info.ts

import { 
  FiPackage, 
  FiCode, 
  FiDatabase, 
  FiServer, 
  FiCpu, 
  FiHardDrive,
  FiLayers,
  FiMessageSquare,
  FiTrendingUp,
  
  FiBox,
  FiMonitor,
  FiCloud,
  FiSettings,
  FiZap,
  FiGrid
} from 'react-icons/fi';

// Types for multilingual support
type BilingualText = {
  en: string;
  th: string;
};

// Extended type for package descriptions
type PackageInfo = {
  name: string;
  version: string;
  description: BilingualText;
  docs: string;
  features?: BilingualText[];
  requirements?: {
    hardware?: string;
    dependencies?: string[];
  };
};

// Section type with bilingual support
type BackendSection = {
  title: BilingualText;
  icon: any;
  packages: PackageInfo[];
};

// Shared translations
const commonTranslations = {
  version: {
    en: "Version",
    th: "เวอร์ชัน"
  },
  features: {
    en: "Features",
    th: "คุณสมบัติ"
  },
  docs: {
    en: "Documentation",
    th: "เอกสาร"
  },
  internal: {
    en: "Internal Documentation",
    th: "เอกสารภายใน"
  }
};

// System Requirements Export
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
  },
  labels: {
    en: {
      title: "System Requirements",
      hardware: "Hardware Requirements",
      environment: "Environment Requirements"
    },
    th: {
      title: "ความต้องการของระบบ",
      hardware: "ความต้องการด้านฮาร์ดแวร์",
      environment: "ความต้องการด้านสภาพแวดล้อม"
    }
  }
};

// Architecture Info Export
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
  },
  labels: {
    en: {
      title: "System Architecture",
      frontend: "Frontend Architecture",
      backend: "Backend Architecture"
    },
    th: {
      title: "สถาปัตยกรรมระบบ",
      frontend: "สถาปัตยกรรมส่วนหน้า",
      backend: "สถาปัตยกรรมส่วนหลัง"
    }
  }
};
// Code Metrics Export
export const codeMetrics = {
  backend: {
    totalClasses: 4,
    mainClasses: [
      {
        name: "AdvancedFinancialAnalyzer",
        methods: 25,
        responsibility: {
          en: "Core financial analysis and AI processing",
          th: "การวิเคราะห์ทางการเงินหลักและการประมวลผล AI"
        }
      },
      {
        name: "MarketData",
        methods: 3,
        responsibility: {
          en: "Stock market data management",
          th: "การจัดการข้อมูลตลาดหุ้น"
        }
      },
      {
        name: "SetSmartAnalyzer",
        methods: 5,
        responsibility: {
          en: "SET SMART specific analysis",
          th: "การวิเคราะห์เฉพาะสำหรับ SET SMART"
        }
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
  },
  labels: {
    en: {
      title: "Code Metrics",
      backend: "Backend Metrics",
      frontend: "Frontend Metrics"
    },
    th: {
      title: "เมตริกโค้ด",
      backend: "เมตริกส่วนหลัง",
      frontend: "เมตริกส่วนหน้า"
    }
  }
};

// Integrations Export
export const integrations = {
  typhoonAPI: {
    version: "1.5",
    endpoints: [
      "chat/completions",
      "analysis/summary",
      "classification"
    ],
    features: [
      {
        en: "Zero-shot classification",
        th: "การจำแนกประเภทแบบ Zero-shot"
      },
      {
        en: "Financial text analysis",
        th: "การวิเคราะห์ข้อความทางการเงิน"
      },
      {
        en: "Market sentiment analysis",
        th: "การวิเคราะห์ความรู้สึกตลาด"
      }
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
    },
    features: [
      {
        en: "Automatic GPU scaling",
        th: "การปรับขนาด GPU อัตโนมัติ"
      },
      {
        en: "High-performance inference",
        th: "การอนุมานประสิทธิภาพสูง"
      },
      {
        en: "Cost-effective deployment",
        th: "การปรับใช้งานที่คุ้มค่า"
      }
    ]
  },
  labels: {
    en: {
      title: "External Integrations",
      typhoon: "Typhoon API Integration",
      runpod: "RunPod GPU Integration"
    },
    th: {
      title: "การเชื่อมต่อภายนอก",
      typhoon: "การเชื่อมต่อ Typhoon API",
      runpod: "การเชื่อมต่อ RunPod GPU"
    }
  }
};

// Main Backend Information
export const backendInfo: BackendSection[] = [
  {
    title: {
      en: "AI Models & Zero-Shot Learning",
      th: "โมเดล AI และการเรียนรู้แบบ Zero-Shot"
    },
    icon: FiZap,
    packages: [
      {
        name: "XLM-RoBERTa Large XNLI",
        version: "joeddav/xlm-roberta-large-xnli",
        description: {
          en: "Multilingual zero-shot classification model with Thai language support for financial analysis",
          th: "โมเดลจำแนกประเภทแบบ zero-shot หลายภาษาที่รองรับภาษาไทยสำหรับการวิเคราะห์การเงิน"
        },
        docs: "https://huggingface.co/joeddav/xlm-roberta-large-xnli",
        features: [
          {
            en: "Multilingual support including Thai",
            th: "รองรับหลายภาษารวมถึงภาษาไทย"
          },
          {
            en: "Zero-shot classification capabilities",
            th: "ความสามารถในการจำแนกประเภทแบบ Zero-shot"
          },
          {
            en: "Fine-tuned for financial domain",
            th: "ปรับแต่งสำหรับโดเมนการเงิน"
          }
        ]
      },
      {
        name: "Typhoon Instruct",
        version: "v1.5",
        description: {
          en: "Advanced Thai language model for financial analysis and investment recommendations",
          th: "โมเดลภาษาไทยขั้นสูงสำหรับการวิเคราะห์การเงินและคำแนะนำการลงทุน"
        },
        docs: "https://api.opentyphoon.ai/docs",
        features: [
          {
            en: "Thai-specific financial analysis",
            th: "การวิเคราะห์การเงินเฉพาะสำหรับภาษาไทย"
          },
          {
            en: "Investment recommendation generation",
            th: "การสร้างคำแนะนำการลงทุน"
          }
        ]
      }
    ]
  },{
    title: {
      en: "Cloud Infrastructure & GPU Services",
      th: "โครงสร้างพื้นฐานคลาวด์และบริการ GPU"
    },
    icon: FiCloud,
    packages: [
      {
        name: "RunPod GPU Serverless",
        version: integrations.runpod.specs.gpu,
        description: {
          en: "Serverless GPU infrastructure for high-performance AI model inference",
          th: "โครงสร้างพื้นฐาน GPU แบบ Serverless สำหรับการประมวลผลโมเดล AI ประสิทธิภาพสูง"
        },
        docs: "https://docs.runpod.io/",
        features: [
          {
            en: `Auto-scaling with ${integrations.runpod.specs.memory} VRAM`,
            th: `ปรับขนาดอัตโนมัติด้วย VRAM ขนาด ${integrations.runpod.specs.memory}`
          },
          {
            en: "Pay-per-use pricing model",
            th: "รูปแบบการคิดค่าใช้จ่ายตามการใช้งานจริง"
          },
          {
            en: "Global deployment options",
            th: "ตัวเลือกการปรับใช้งานทั่วโลก"
          }
        ]
      }
    ]
  },
  {
    title: {
      en: "System Architecture & Performance",
      th: "สถาปัตยกรรมระบบและประสิทธิภาพ"
    },
    icon: FiGrid,
    packages: [
      {
        name: "FastAPI Backend",
        version: "1.0.0",
        description: {
          en: `High-performance async API with ${architectureInfo.backend.performance.concurrency} workers`,
          th: `API แบบ async ประสิทธิภาพสูงพร้อมเวิร์กเกอร์ ${architectureInfo.backend.performance.concurrency} ตัว`
        },
        docs: "Internal",
        features: [
          {
            en: "Async request handling",
            th: "การจัดการคำขอแบบ Async"
          },
          {
            en: `Rate limiting: ${architectureInfo.backend.performance.rateLimit}`,
            th: `การจำกัดอัตราการเรียก: ${architectureInfo.backend.performance.rateLimit}`
          }
        ]
      },
      {
        name: "Financial Analysis Pipeline",
        version: "1.0.0",
        description: {
          en: "End-to-end financial data processing and analysis system",
          th: "ระบบประมวลผลและวิเคราะห์ข้อมูลทางการเงินแบบครบวงจร"
        },
        docs: "Internal",
        features: [
          {
            en: "Real-time market data processing",
            th: "การประมวลผลข้อมูลตลาดแบบเรียลไทม์"
          },
          {
            en: "AI-powered analysis pipeline",
            th: "ไปป์ไลน์การวิเคราะห์ด้วย AI"
          }
        ]
      }
    ]
  },
  {
    title: {
      en: "Hardware Requirements & Optimization",
      th: "ความต้องการด้านฮาร์ดแวร์และการเพิ่มประสิทธิภาพ"
    },
    icon: FiSettings,
    packages: [
      {
        name: "GPU Configuration",
        version: systemRequirements.hardware.gpu,
        description: {
          en: "Optimized GPU settings for AI model inference",
          th: "การตั้งค่า GPU ที่เหมาะสมสำหรับการประมวลผลโมเดล AI"
        },
        docs: "Internal",
        features: [
          {
            en: `RAM: ${systemRequirements.hardware.ram}`,
            th: `แรม: ${systemRequirements.hardware.ram}`
          },
          {
            en: `VRAM: ${systemRequirements.hardware.vram}`,
            th: `วีแรม: ${systemRequirements.hardware.vram}`
          }
        ]
      },
      {
        name: "Environment Setup",
        version: "Latest",
        description: {
          en: "Development and production environment configuration",
          th: "การกำหนดค่าสภาพแวดล้อมสำหรับการพัฒนาและการใช้งานจริง"
        },
        docs: "Internal",
        features: [
          {
            en: `Python ${systemRequirements.environment.python}`,
            th: `ไพธอน ${systemRequirements.environment.python}`
          },
          {
            en: `CUDA ${systemRequirements.environment.cuda}`,
            th: `คูดา ${systemRequirements.environment.cuda}`
          }
        ]
      }
    ]
  }
];

// Translations for UI
export const navigationTranslations = {
  en: {
    documentation: "Documentation",
    apiReference: "API Reference",
    architecture: "Architecture",
    aiFinancialAssistant: "AI Financial Assistant",
    systemRequirements: "System Requirements",
    analysis: "Analysis"
  },
  th: {
    documentation: "เอกสาร",
    apiReference: "เอกสาร API",
    architecture: "สถาปัตยกรรม",
    aiFinancialAssistant: "ผู้ช่วยวิเคราะห์การเงิน AI",
    systemRequirements: "ความต้องการของระบบ",
    analysis: "การวิเคราะห์"
  }
} as const;

// Export default object ใหม่
export default {
  backendInfo,
  systemRequirements,
  architectureInfo,
  codeMetrics,
  integrations,
  navigationTranslations  // เปลี่ยนจาก translations เป็น navigationTranslations
};