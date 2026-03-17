/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'romantic-pink': '#ff4d6d',
        'romantic-purple': '#8a2be2',
        'romantic-dark': '#0f172a',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Montserrat', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'heartbeat': 'heartbeat 2s ease-in-out infinite',
        'fadeIn': 'fadeIn 1s ease-out',
        'fadeInUp': 'fadeInUp 1s ease-out',
      },
    },
  },
  plugins: [],
}
