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
  plugins: [require('@tailwindcss/typography')],
  purge: ['./components/*.tsx', './layouts/*.tsx', './pages/**/*.tsx'],
  theme: {
    colors: {
      // These must be included manually.
      current: 'currentColor',
      transparent: 'transparent',
      // bg-linkedIn || text-linkedIn
      linkedIn: '#0072B1',
      // bg-twitter || text-twitter
      twitter: '#1DA1F2',
      ...colors,
    },
    fill: theme => ({
      // fill-spotify
      spotify: 'rgba(30, 215, 96, 1)',
    }),
    extend: {
      animation: {
        // animate-move
        move: 'move 8s linear infinite',
        // animate-move-faster
        'move-faster': 'move 2s linear infinite',
        // animate-wiggle
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      backgroundImage: theme => ({
        // bg-instagram
        instagram:
          'radial-gradient(circle at 30% 107%, #fdf497 0%,#fdf497 5%,#fd5949 45%,#d6249f 60%,#285aeb 90%)',
      }),
      keyframes: {
        move: { to: { transform: 'translateX(-100%)' } },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-12deg) scale(0.95)' },
          '50%': { transform: 'rotate(12deg) scale(0.95)' },
        },
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
              borderColor: theme('colors.transparent'),
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
              color: theme('colors.indigo.600'),
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
              fontStyle: 'italic',
              fontWeight: theme('fontWeight.normal'),
              paddingBottom: theme('spacing.1'),
              paddingLeft: theme('spacing.2'),
              paddingRight: theme('spacing.2'),
              paddingTop: theme('spacing.1'),
            },
            'code::after': {
              content: theme('backgroundImage.none'),
            },
            'code::before': {
              content: theme('backgroundImage.none'),
            },
            color: theme('colors.blueGray.900'),
            del: {
              color: theme('colors.red.500'),
              fontWeight: theme('fontWeight.semibold'),
            },
            fontSize: '1.125rem',
            h1: {
              color: theme('colors.blueGray.900'),
              fontWeight: theme('fontWeight.bold'),
            },
            h2: {
              color: theme('colors.blueGray.900'),
              fontWeight: theme('fontWeight.semibold'),
            },
            h3: {
              color: theme('colors.blueGray.900'),
              fontWeight: theme('fontWeight.semibold'),
            },
            h4: {
              color: theme('colors.blueGray.900'),
              fontWeight: theme('fontWeight.semibold'),
            },
            h6: {
              color: theme('colors.indigo.500'),
              fontFamily: theme('font.mono'),
              fontSize: theme('fontSize.2xl')[0],
              fontWeight: theme('fontWeight.semibold'),
            },
            hr: {
              borderColor: theme('colors.blueGray.600'),
              marginBottom: theme('spacing.8'),
              marginTop: theme('spacing.8'),
            },
            img: {
              alignItems: 'center',
              borderRadius: theme('borderRadius.lg'),
              display: 'flex',
              justifyContent: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: theme('maxWidth.full'),
            },
            lineHeight: theme('lineHeight.7'),
            maxWidth: 'none',
            pre: {
              overflowX: 'auto',
              paddingBottom: theme('spacing.4'),
              paddingTop: theme('spacing.4'),
            },
            'pre code': {
              backgroundColor: theme('colors.transparent'),
              borderWidth: theme('borderWidth.0'),
              borderRadius: theme('borderRadius.none'),
              padding: theme('spacing.0'),
              fontWeight: theme('fontWeight.normal'),
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit',
            },
            'pre code::after': {
              content: theme('backgroundImage.none'),
            },
            'pre code::before': {
              content: theme('backgroundImage.none'),
            },
            strong: {
              color: theme('colors.blueGray.600'),
              fontWeight: theme('fontWeight.medium'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.blueGray.400'),
            },
            'div > p > code': {
              backgroundColor: theme('colors.transparent'),
              borderRadius: theme('borderRadius.none'),
              color: theme('colors.blueGray.700'),
              fontWeight: theme('fontWeight.normal'),
              paddingBottom: theme('spacing.0'),
              paddingLeft: theme('spacing.0'),
              paddingRight: theme('spacing.0'),
              paddingTop: theme('spacing.0'),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      animation: [
        'focus',
        'group-hover',
        'hover',
        'responsive',
        'motion-reduce',
        'motion-safe',
      ],
      backgroundImage: ['focus', 'group-hover', 'hover', 'responsive'],
      gradientColorStops: ['focus', 'group-hover', 'hover', 'responsive'],
      padding: ['focus', 'group-hover', 'hover', 'responsive'],
      rotate: [
        'focus',
        'group-hover',
        'hover',
        'responsive',
        'motion-reduce',
        'motion-safe',
      ],
      scale: [
        'focus',
        'group-hover',
        'hover',
        'responsive',
        'motion-reduce',
        'motion-safe',
      ],
      transform: [
        'focus',
        'group-hover',
        'hover',
        'responsive',
        'motion-reduce',
        'motion-safe',
      ],
      transformOrigin: [
        'focus',
        'group-hover',
        'hover',
        'responsive',
        'motion-reduce',
        'motion-safe',
      ],
      transitionDelay: [
        'focus',
        'group-hover',
        'hover',
        'responsive',
        'motion-reduce',
        'motion-safe',
      ],
      transitionDuration: [
        'focus',
        'group-hover',
        'hover',
        'responsive',
        'motion-reduce',
        'motion-safe',
      ],
      transitionProperty: [
        'focus',
        'group-hover',
        'hover',
        'responsive',
        'motion-reduce',
        'motion-safe',
      ],
      transitionTimingFunction: [
        'focus',
        'group-hover',
        'hover',
        'responsive',
        'motion-reduce',
        'motion-safe',
      ],
      translate: [
        'focus',
        'group-hover',
        'hover',
        'responsive',
        'motion-reduce',
        'motion-safe',
      ],
    },
  },
}
