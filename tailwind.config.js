const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: false,
  important: true,
  plugins: [],
  purge: ['./components/*.tsx', './layouts/*.tsx', './pages/**/*.tsx'],
  theme: {
    colors: {
      // These must be included manually.
      current: 'currentColor',
      transparent: 'transparent',
      ...colors,
    },
  },
  variants: {
    extend: {},
  },
}
