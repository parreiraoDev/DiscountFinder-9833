/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FF4747',
        'primary-dark': '#E63E3E',
        secondary: '#2B2D42',
        accent: '#FFB649',
      }
    }
  },
  plugins: [],
}