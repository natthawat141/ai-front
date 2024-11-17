import { NextConfig } from "next";

// ประกาศ configuration สำหรับ Next.js
const nextConfig: NextConfig = {
  // เปิดใช้งาน React Strict Mode
  reactStrictMode: true,

  // การตั้งค่า TypeScript
  typescript: {
    // ข้ามข้อผิดพลาดในขั้นตอน build
    ignoreBuildErrors: true,
  },

  // การตั้งค่า ESLint
  eslint: {
    // ข้ามข้อผิดพลาด ESLint ในขั้นตอน build
    ignoreDuringBuilds: true,
  },

  // การตั้งค่า webpack เพิ่มเติม (หากจำเป็น)
  webpack: (config, { isServer }) => {
    // ตัวอย่าง: ปรับแต่งเพื่อเพิ่ม Loader หรือ Plugin
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // ห้ามใช้โมดูล 'fs' ฝั่ง client
      };
    }
    return config;
  },

  // เพิ่ม environment variables หากจำเป็น
  env: {
    NEXT_PUBLIC_API_URL: "https://your-api-url.com",
  },
};

export default nextConfig;
