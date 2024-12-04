/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "slide-in-left": "slideInLeft 1s ease-out forwards",
        "slide-in-right": "slideInRight 1s ease-out forwards",
        // "fade-in": "fadeIn 1s ease-out forwards",
      },
      keyframes: {
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0"},
          "100%": { transform: "translateX(0)", opacity: "1"},
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0"},
          "100%": { transform: "translateX(0)", opacity: "1"},
        },
      },
    },
  },
  plugins: [],
}

