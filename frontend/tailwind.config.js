/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#d97706', // dark orange
          light: '#fbbf24',   // lighter orange
          dark: '#b45309',    // even darker orange
        },
      },
    },
  },
  plugins: [],
}

