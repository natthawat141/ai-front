import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core Theme Colors
        primary: {
          DEFAULT: "#0A0F1E",
          light: "#1A1F2E",
          dark: "#050A14",
          100: "#1A1F2E",
          200: "#151A28",
          300: "#101522",
          400: "#0A0F1E",
          500: "#050A14",
          600: "#030710",
          700: "#02050C",
          800: "#010308",
          900: "#000204"
        },
        secondary: {
          DEFAULT: "#0EA5E9",
          light: "#38BDF8",
          dark: "#0284C7",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E"
        },
        accent: {
          blue: {
            DEFAULT: "#00D1FF",
            light: "#33DBFF",
            dark: "#00A8CC",
            100: "#E6FAFF",
            200: "#B3F1FF",
            300: "#80E8FF",
            400: "#4DDFFF",
            500: "#00D1FF",
            600: "#00A8CC",
            700: "#007F99",
            800: "#005566",
            900: "#002C33"
          },
          orange: {
            DEFAULT: "#FF7B00",
            light: "#FF9933",
            dark: "#CC6200",
            100: "#FFF0E6",
            200: "#FFD6B3",
            300: "#FFBD80",
            400: "#FFA34D",
            500: "#FF7B00",
            600: "#CC6200",
            700: "#994A00",
            800: "#663300",
            900: "#331A00"
          }
        },
        // UI Element Colors
        surface: {
          DEFAULT: "rgba(30, 41, 59, 0.8)",
          light: "rgba(30, 41, 59, 0.6)",
          dark: "rgba(30, 41, 59, 0.95)"
        },
        overlay: {
          light: "rgba(14, 165, 233, 0.1)",
          DEFAULT: "rgba(14, 165, 233, 0.15)",
          dark: "rgba(14, 165, 233, 0.2)"
        }
      },
      backgroundImage: {
        // Updated Circuit Pattern with New Color System
        'circuit-pattern': `linear-gradient(to right, var(--tw-colors-overlay-DEFAULT), var(--tw-colors-overlay-light)),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.386l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.344 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656l-19.8 19.8 1.415 1.413L60 19.514v-2.83zm0 5.657l-16.97 16.97 1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.415 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413 7.07-7.07v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83z' fill='currentColor' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-pattern': `radial-gradient(circle at center, var(--tw-colors-overlay-light) 0%, transparent 100%)`,
      },
      keyframes: {
        "glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" }
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "data-flow": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(100px)", opacity: "0" }
        }
      },
      animation: {
        "glow": "glow 3s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "data-flow": "data-flow 3s ease-in-out infinite"
      },
      boxShadow: {
        'glow-sm': '0 0 10px -1px rgba(14, 165, 233, 0.1)',
        'glow': '0 0 20px -2px rgba(14, 165, 233, 0.15)',
        'glow-lg': '0 0 30px -3px rgba(14, 165, 233, 0.2)',
        'neon': '0 0 5px theme(colors.secondary.DEFAULT), 0 0 20px theme(colors.secondary.DEFAULT)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
  ],
}

export default config