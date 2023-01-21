/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "hsl(0deg, 0%, 8%)",
        netflixRed : "#e50a14"
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
       },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}