const colors = require('tailwindcss/colors')

module.exports = {
  // Enables the use of dark mode with 'next-themes'.
  darkMode: 'class',
  important: true,
  mode: 'jit',
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas'),
    require('@tailwindcss/typography'),
  ],
  purge: ['./components/*.tsx', './layouts/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      animation: {
        // animate-move
        move: 'move 8s linear infinite',
        // animate-move-faster
        'move-faster': 'move 2s linear infinite',
        // animate-wiggle
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      backgroundImage: {
        // bg-instagram
        instagram:
          'radial-gradient(circle at 30% 107%, #fdf497 0%,#fdf497 5%,#fd5949 45%,#d6249f 60%,#285aeb 90%)',
      },
      colors: {
        // These must be included manually.
        current: 'currentColor',
        transparent: 'transparent',
        // bg-linkedIn || text-linkedIn
        linkedIn: '#0072B1',
        // bg-twitter || text-twitter
        twitter: '#1DA1F2',
        // Exposes the whole Tailwind color palette.
        ...colors,
      },
      fill: theme => ({
        // fill-spotify
        spotify: 'rgba(30, 215, 96, 1)',
      }),
      // Defines the template areas using 'grid-template-areas':
      // Generates:
      // - grid-areas-mobile
      // - grid-areas-tablet
      // - grid-areas-desktop
      // - grid-areas-nav
      // - grid-in-<name> (i.e. grid-in-nav)
      gridTemplateAreas: {
        mobile: ['header', 'section', 'nav', 'footer'],
        tablet: ['header', 'section', 'nav', 'footer'],
        desktop: ['header header', 'aside section', 'nav nav', 'footer footer'],
        nav: ['nav-col-1', 'nav-col-2'],
      },
      // Defines the template columns using 'grid-template-columns':
      // Generates:
      // - grid-cols-mobile
      // - grid-cols-tablet
      // - grid-cols-desktop
      gridTemplateColumns: {
        mobile: 'minmax(300px, auto)',
        tablet: 'minmax(300px, auto)',
        desktop: '300px minmax(300px, auto)',
        nav: '150px 150px',
      },
      // Defines the template rows using 'grid-template-rows':
      // Generates:
      // - grid-rows-mobile
      // - grid-rows-tablet
      // - grid-rows-desktop
      gridTemplateRows: {
        mobile: '80px 1fr minmax(max-content, auto) minmax(max-content, auto)',
        tablet: '80px 1fr minmax(max-content, auto) minmax(max-content, auto)',
        desktop: '80px 1fr minmax(max-content, auto) minmax(max-content, auto)',
        nav: '1fr 1fr 1fr',
      },
      keyframes: {
        move: { to: { transform: 'translateX(-100%)' } },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-12deg) scale(0.95)' },
          '50%': { transform: 'rotate(12deg) scale(0.95)' },
        },
      },
      stroke: theme => ({
        'accent-1': theme('colors.teal.200'),
        'accent-2': theme('colors.fuchsia.900'),
        'accent-3': theme('colors.amber.200'),
        'accent-4': theme('colors.amber.500'),
      }),
    },
  },
  variants: {
    // Will enable the ability to do the following:
    // grid-areas-mobile md:grid-areas-tablet lg:grid-areas-desktop.
    gridTemplateAreas: ['responsive'],
    gridTemplateColumns: ['responsive'],
    gridTemplateRows: ['responsive'],
    // Will enabled the ability to do the following:
    // bg-black dark:bg-white
    typography: ['dark'],
  },
}
