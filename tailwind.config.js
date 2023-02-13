const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
        cool: '#f9f9f9',
      },
      fontFamily: {
        // to change, update font in _document.js
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        stock: [defaultTheme.fontFamily.sans]
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "2/3": "2 / 3",
        "9/16": "9 / 16"
      },
      animation: {
        'logoStartUp': 'logoStartUp 6s linear forwards',
        'logoStartUpDark': 'logoStartUpDark 6s linear forwards',
        'project': 'project .3s linear forwards'
      },
      keyframes: {
        logoStartUp: {
          '0%': {
            'fill-opacity': '0',
            'fill': 'rgb(63, 62, 62)',
            'stroke-dashoffset': '1000'
          },
          '20%': {
            'fill-opacity': '1',
            'stroke-opacity': '1'
          },
          '80%': { 'stroke-opacity': '0' },
          '100%': {
            'fill-opacity': '1',
            'stroke-dashoffset': '0',
            'stroke-opacity': '0'
          }
        },
        logoStartUpDark: {
          '0%': {
            'fill-opacity': '0',
            'fill': 'rgb(255, 255, 255)',
            'stroke-dashoffset': '1000'
          },
          '20%': {
            'fill-opacity': '1',
            'stroke-opacity': '1'
          },
          '80%': { 'stroke-opacity': '0' },
          '100%': {
            'fill-opacity': '1',
            'stroke-dashoffset': '0',
            'stroke-opacity': '0'
          }
        },
        project: {
          '0%': {
            'translate': '-200px',
            'opacity': '0'
          },
          '100%': {
            'opacity': '1',
            'translate': '0px'
          }
        },
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("tailwindcss-animation-delay"),
  ]
};
