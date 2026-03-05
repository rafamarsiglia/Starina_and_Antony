/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wedding-cream': '#FDFCF9',
        'wedding-gold': '#C5A059',
        'wedding-gray': '#717171',
        'wedding-light-gray': '#F2F2F2',
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        script: ["Great Vibes", "cursive"],
        sans: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
}
