/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'chat-dark': '#212121',
        'chat-darker': '#171717',
        'chat-input': '#2f2f2f',
      },
    },
  },
  plugins: [],
};
