/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '480px',

      'md': '640px',

      'lg': '820px',

      'xl': '1024px',

      '2xl': '1280px',
    },
    extend: {},
  },
  plugins: [],
}