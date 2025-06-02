/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2B73DF',
        secondary: {
          light: '#BCD879',
          DEFAULT: '#DCF0A4',
          dark: '#A3FC9C',
          purple: '#6366f1',
        },
        neutral: {
          50: '#F7F7F7',
          100: '#E4E5E9',
          200: '#D3D5D9',
          300: '#AFB2B8',
          400: '#8D94A2',
          500: '#5C616B',
          600: '#323438',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        informative: '#5082BE',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Barlow', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
