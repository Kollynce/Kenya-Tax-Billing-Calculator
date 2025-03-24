/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/*.{css,scss}"
  ],
  theme: {
    extend: {
      colors: {
        'kenya-red': '#BE0027',
        'kenya-green': '#006600',
        'kenya-black': '#000000',
      },
      backgroundImage: {
        'kenya-gradient': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      gradientColorStops: {
        'kenya-gradient-from': '#BE0027',
        'kenya-gradient-to': '#006600',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}