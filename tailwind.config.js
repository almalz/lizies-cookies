module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          100: '#d5d0dc',
          200: '#aba1b9',
          300: '#827396',
          400: '#6d5b85',
          500: '#584473',
          600: '#432c62',
          700: '#2E1550',
          800: '#251140',
          900: '#1c0d30',
        },
        pink: {
          100: '#fdecec',
          200: '#fad9da',
          300: '#f8c7c7',
          400: '#f5b4b5',
          500: '#F3A1A2',
          600: '#c28182',
          700: '#926161',
          800: '#614041',
          900: '#312020',
          gray: '#D3C1C1',
        },
        white: '#fff',
        black: '#000',
      },
      fontFamily: {
        title: ['Chloé', ...defaultTheme.fontFamily.serif],
        body: ['Parmigiano Pro', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
