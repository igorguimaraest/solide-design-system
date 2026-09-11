/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../ui-kit/src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [require('./dist/tailwind-theme.js')],
  plugins: [],
};
