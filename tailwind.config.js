/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-400': '#7A70DD',
        'green-400': '#D1E99F',
        'white-400': '#FFFFFF',
        'black-400': '#1E1D1E',
        'grey-400': '#8E91A0',
        'grey-300': '#C8CAD8',
        'grey-200': '#F0F0F0',
        'yellow-400': '#FFE9B1',
      },
    },
  },
  plugins: [],
}

