const { colors, fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: false,
  important: true,
  mode: 'jit',
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas'),
    require('@tailwindcss/typography'),
  ],
  purge: ['./components/*.tsx', './layouts/*.tsx', './pages/**/*.tsx'],
  theme: {
    colors: {
      // These must be included manually.
      black: '#000000',
      // Used for the gradient effect for <Tag tag="colombia" />
      blue: {
        500: colors.blue[500],
      },
      // bg-brand || border-brand || text-brand
      brand: '#5bbbc6',
      current: 'currentColor',
      // Used for the gradient effect for <Tag tag="colombia" />
      red: {
        500: colors.red[500],
      },
      transparent: 'transparent',
      white: '#ffffff',
      // Used for the gradient effect for <Tag tag="colombia" />
      yellow: {
        500: colors.yellow[500],
      },
      // bg-accent-blue || border-accent-blue || text-accent-blue
      accent: {
        blue: '#2d64ae',
        green: '#64bb91',
        magenta: '#d52f77',
        orange: '#ec7f31',
        purple: '#8b68de',
        red: '#dd3a5e',
        yellow: '#f1c946',
      },
      // bg-gray-dark || border-gray-dark || text-gray-dark
      gray: {
        dark: '#172024',
        light: '#3B4F55',
        medium: '#253236',
      },
      primary: '#fdfdfd',
      secondary: '#e4e4e4',
      // bg-linkedIn || text-linkedIn
      linkedIn: '#0072B1',
      // bg-twitter || text-twitter
      twitter: '#1DA1F2',
    },
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
      fill: theme => ({
        // fill-spotify
        spotify: 'rgba(30, 215, 96, 1)',
      }),
      fontFamily: {
        ...fontFamily,
        sans: ['Quicksand', ...fontFamily.sans],
        'custom-header': ['Open Sans'],
      },
      // Defines the template areas using 'grid-template-areas':
      // Generates:
      // - grid-areas-mobile
      // - grid-areas-tablet
      // - grid-areas-desktop
      gridTemplateAreas: {
        mobile: ['header', 'section', 'footer'],
        tablet: ['header', 'section', 'footer'],
        desktop: ['header header', 'aside section', 'footer footer'],
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
      },
      keyframes: {
        move: { to: { transform: 'translateX(-100%)' } },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-12deg) scale(0.95)' },
          '50%': { transform: 'rotate(12deg) scale(0.95)' },
        },
      },
    },
  },
  variants: {
    // Will enable the ability to do the following:
    // grid-areas-mobile md:grid-areas-tablet lg:grid-areas-desktop.
    gridTemplateAreas: ['responsive'],
    gridTemplateColumns: ['responsive'],
    gridTemplateRows: ['responsive'],
  },
}
