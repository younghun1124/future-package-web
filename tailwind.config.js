/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F1EDE1',    // 메인 백그라운드 컬러
        'base': '#000000',       // 기본 텍스트 컬러
        'accent': '#46D88F',     // 포인트 컬러
      },
    },
  },
  plugins: [],
} 