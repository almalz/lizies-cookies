const defaultTheme = require('tailwindcss/defaultTheme')

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
          700: '#2E1550', //source
          800: '#251140',
          900: '#1c0d30',
        },
        pink: {
          100: '#fdecec',
          200: '#fad9da',
          300: '#f8c7c7',
          400: '#f5b4b5',
          500: '#F3A1A2', //source
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
        title: ['Chloe', ...defaultTheme.fontFamily.serif],
        subtitle: ['Gistesy', ...defaultTheme.fontFamily.serif],
        body: ['Parmigiano Text Pro', ...defaultTheme.fontFamily.sans],
      },
      borderWidth: {
        3: '3px',
      },
      fontSize: {
        '3xl': [
          '2rem',
          {
            lineHeight: '2.25rem',
          },
        ],
      },
      spacing: {
        128: '32rem',
        192: '48rem',
        section: '50rem',
      },
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
      },
    },
    corePlugins: {
      aspectRatio: false,
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
