/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg:      '#0B100D',
          surface: '#111A14',
          card:    '#172019',
        },
        brand: {
          crimson:      '#8B0000',
          crimsonLight: '#C8102E',
          forest:       '#0D4A2D',
          forestMid:    '#16603A',
          gold:         '#C8A055',
          goldLight:    '#E0B96A',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
