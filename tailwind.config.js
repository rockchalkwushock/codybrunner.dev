const colors = require('tailwindcss/colors')

/**
 * Base Theme
 * - bg-primary:      blueGray-300
 * - bg-secondary:    blueGray-50
 * - text-primary:    blueGray-900
 * - text-secondary:  blueGray-700
 */

module.exports = {
  // This must match the attribute on next-themes <ThemeProvider /> in BaseLayout.tsx.
  darkMode: 'class',
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
      // This tells @tailwindcss/typography to look for this
      // variant and apply the custom styles we declared above.
      typography: ['dark'],
    },
  },
}
