const colors = require('tailwindcss/colors')

module.exports = {
  // Enables the use of dark mode with 'next-themes'.
  darkMode: 'class',
  important: true,
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas'),
    require('@tailwindcss/typography'),
  ],
  purge: ['./components/*.tsx', './layouts/*.tsx', './pages/**/*.tsx'],
  theme: {
    colors: {
      // These must be included manually.
      current: 'currentColor',
      transparent: 'transparent',
      // Exposes the whole Tailwind color palette.
      ...colors,
    },
    // Defines the template areas using 'grid-template-areas':
    // Generates:
    // - grid-areas-mobile
    // - grid-areas-tablet
    // - grid-areas-desktop
    // - grid-in-<name> (i.e. grid-in-nav)
    gridTemplateAreas: {
      mobile: ['header', 'nav', 'section', 'footer'],
      tablet: ['header header', 'aside section', 'nav nav', 'footer footer'],
      desktop: ['header header', 'aside section', 'nav nav', 'footer footer'],
    },
    // Defines the template columns using 'grid-template-columns':
    // Generates:
    // - grid-cols-mobile
    // - grid-cols-tablet
    // - grid-cols-desktop
    gridTemplateColumns: {
      mobile: '1fr',
      tablet: '250px 1fr',
      desktop: '300px 1fr',
    },
    // Defines the template rows using 'grid-template-rows':
    // Generates:
    // - grid-rows-mobile
    // - grid-rows-tablet
    // - grid-rows-desktop
    gridTemplateRows: {
      mobile: '100px 100px 1fr 100px',
      tablet: '100px 1fr 150px 50px',
      desktop: '100px 1fr 150px 75px',
    },
  },
  variants: {
    // Will enable the ability to do the following:
    // grid-areas-mobile md:grid-areas-tablet lg:grid-areas-desktop.
    gridTemplateAreas: ['responsive'],
    // Will enabled the ability to do the following:
    // bg-black dark:bg-white
    typography: ['dark'],
  },
}
