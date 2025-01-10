/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}", // Se seus arquivos JS e HTML estiverem na pasta src
  ],
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        home: url('/assets/bg.png')
      },
    },
  },
  plugins: [],
};
