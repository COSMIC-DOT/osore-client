/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      black: '#1E1E1E',
      white: '#FFFFFF',
      gray0: '#F7F8F9',
      gray1: '#E9EBEF',
      gray2: '#C5C6CD',
      gray3: '#999BA5',
      gray4: '#6F717C',
      primary: '#4E60FF',
      primary_light: '#C3C9FF',
      primary_dark: '#3617B3',
      secondary: '#00E2D9',
      secondary_light: '#A8F1EE',
      secondary_dark: '#00B0A9',
      error: '#FF5F4A',
    },
    extend: {
      zIndex: {
        0: '0',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
