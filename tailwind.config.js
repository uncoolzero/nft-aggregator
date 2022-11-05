/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'text': 'text 4s ease infinite'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        'text': {
          '0%': {
            'filter': 'hue-rotate(0)'
          },
          '100%': {
            'filter': 'hue-rotate(-1turn)'
          }
        }
      },
      patterns: {
        opacities: {
            100: "1",
            80: ".80",
            60: ".60",
            40: ".40",
            20: ".20",
            10: ".10",
            5: ".05",
        },
        sizes: {
            1: "0.25rem",
            2: "0.5rem",
            4: "1rem",
            6: "1.5rem",
            8: "2rem",
            16: "4rem",
            20: "5rem",
            24: "6rem",
            32: "8rem",
        }
    }
    },
  },
  plugins: [
    require('tailwindcss-bg-patterns'),
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-font-inter'),
  ],
}
