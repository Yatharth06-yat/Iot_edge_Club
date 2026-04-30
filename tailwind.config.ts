import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        iot: {
          dark: "#0F172A",    // Dark Background (Slate-900)
          surface: "#1E293B", // Card/Surface Background (Slate-800)
          green: "#2563EB",   // Primary Accent - Blue
          'green-dark': "#0EA5E9", // Secondary Accent - Sky Blue
          light: "#F8FAFC",   // Light Mode Background
          text: "#0F172A",    // Primary Text
        },
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;