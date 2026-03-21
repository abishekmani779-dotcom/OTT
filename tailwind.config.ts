import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#F9F9F9",
        "primary-blue": "#1863E1",
        "pure-black": "#000000",
        "off-white": "#F9F9F9",
        "deep-grey": "#1A1A1A"
      },
      boxShadow: {
        'blue-tint': '0 10px 30px -10px rgba(24, 99, 225, 0.2)',
        'blue-glow': '0 0 15px rgba(24, 99, 225, 0.5)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      }
    },
  },
  plugins: [],
};
export default config;
