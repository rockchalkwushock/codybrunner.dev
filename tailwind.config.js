const colors = require('tailwindcss/colors')

/**
 * Base Theme
 * - bg-primary:      blueGray-300
 * - bg-secondary:    blueGray-50
 * - text-primary:    blueGray-900
 * - text-secondary:  blueGray-700
 */

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
