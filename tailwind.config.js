const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

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
  plugins: [require('@tailwindcss/typography')],
  purge: ['./components/*.tsx', './layouts/*.tsx', './pages/**/*.tsx'],
  theme: {
    colors: {
      // These must be included manually.
      current: 'currentColor',
      transparent: 'transparent',
      ...colors,
    },
    extend: {
      animation: {
        move: 'move 8s linear infinite',
      },
      keyframes: {
        move: { to: { transform: 'translateX(-100%)' } },
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            a: {
              '&:hover': {
                color: theme('colors.yellow.500'),
                textDecoration: 'none',
              },
            },
            'a code': {
              backgroundColor: 'unset',
              borderRadius: 'unset',
              fontWeight: theme('fontWeight.semibold'),
              paddingLeft: 'unset',
              paddingRight: 'unset',
              '&:hover': {
                color: theme('colors.yellow.500'),
                textDecoration: 'none',
              },
            },
            'a > img': {
              borderRadius: theme('borderRadius.none'),
            },
            blockquote: {
              backgroundColor: theme('colors.blue.200'),
              border: theme('borderWidth.DEFAULT'),
              borderColor: theme('colors.blue.700'),
              borderLeftColor: 'unset',
              borderLeftWidth: 'unset',
              borderStyle: 'solid',
              borderRadius: theme('borderRadius.md'),
              boxShadow: theme('boxShadow.lg'),
              color: theme('colors.blue.700'),
              fontStyle: 'italic',
              fontWeight: theme('fontWeight.light'),
              quotes: 'unset',
            },
            'blockquote p': {
              marginBottom: theme('spacing.2'),
              marginTop: theme('spacing.2'),
            },
            'blockquote p code': {
              backgroundColor: 'unset',
              borderRadius: 'unset',
              color: theme('colors.purple.600'),
              fontStyle: 'italic',
              fontWeight: theme('fontWeight.medium'),
              paddingLeft: 'unset',
              paddingRight: 'unset',
            },
            'blockquote p:first-of-type::before': {
              content: 'open-quote',
            },
            'blockquote p:last-of-type::after': {
              content: 'close-quote',
            },
            code: {
              backgroundColor: theme('colors.blueGray.50'),
              borderRadius: theme('borderRadius.full'),
              color: theme('colors.blueGray.700'),
              fontWeight: theme('fontWeight.semibold'),
              paddingBottom: theme('spacing.1'),
              paddingLeft: theme('spacing.2'),
              paddingRight: theme('spacing.2'),
              paddingTop: theme('spacing.1'),
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            color: theme('colors.blueGray.900'),
            del: {
              color: theme('colors.red.500'),
              fontWeight: theme('fontWeight.semibold'),
            },
            h1: {
              color: theme('colors.blueGray.900'),
              fontWeight: theme('fontWeight.extrabold'),
              textDecoration: 'underline',
            },
            h2: {
              color: theme('colors.blueGray.900'),
              fontWeight: theme('fontWeight.bold'),
              textDecoration: 'underline',
            },
            h3: {
              color: theme('colors.blueGray.900'),
              fontWeight: theme('fontWeight.semibold'),
              textDecoration: 'underline',
            },
            h4: {
              color: theme('colors.blueGray.900'),
              fontWeight: theme('fontWeight.semibold'),
            },
            img: {
              alignItems: 'center',
              borderRadius: theme('borderRadius.lg'),
              display: 'flex',
              justifyContent: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: '100%',
            },
            maxWidth: 'none',
            pre: {
              color: theme('colors.gray.200', defaultTheme.colors.gray[200]),
              backgroundColor: theme(
                'colors.gray.800',
                defaultTheme.colors.gray[800]
              ),
              overflowX: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: '0',
              padding: '0',
              fontWeight: '400',
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit',
            },
            'pre code::before': {
              content: 'none',
            },
            'pre code::after': {
              content: 'none',
            },
            strong: {
              color: theme('colors.purple.700'),
              fontWeight: theme('fontWeight.semibold'),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
}
