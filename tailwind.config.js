/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        mono: ['Orbitron', 'monospace'],
        sans: ['Noto Sans SC', 'sans-serif'],
      },
      colors: {
        eclipse: {
          bg: '#0a0e27',
          deep: '#1a1a3e',
          gold: '#f0c040',
          teal: '#64ffda',
          red: '#ff2d2d',
          muted: '#8892b0',
          dim: '#5a6080',
          text: '#e8eaf6',
        },
      },
    },
  },
  plugins: [],
};
