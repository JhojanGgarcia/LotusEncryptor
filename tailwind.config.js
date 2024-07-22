/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: "class",
  theme: {
    extend: {
      rotate: {
        '360': '360deg'
      },
      colors: {
        'lotus-primary': {
          50: '#eef0ff',
          100: '#dfe3ff',
          200: '#c2c6ff',
          300: '#a3a7fe',
          400: '#857ffa',
          500: '#7060f4',
          600: '#6243e8',
          700: '#5535cd',
          800: '#452ea5',
          900: '#3c2c83',
          950: '#241a4c'
        },
        'lotus-secondary': {
          50: '#f1f4fd',
          100: '#dfe7fa',
          200: '#c7d5f6',
          300: '#a0baf0',
          400: '#668ce5',
          500: '#5272df',
          600: '#3d56d3',
          700: '#3444c1',
          800: '#30399d',
          900: '#2b347d',
          950: '#1e224d'
        },
        lotus: {
          900: '#18181B'
        }
      },
      screens: {
        xxs: { raw: '(max-width: 300px)' },
        xs: { raw: '(min-width: 320px)' }
      },
      animation: {
        'background-shine': 'background-shine 2s linear infinite',
        'border-width' :  'border-width 4s linear infinite both' 
      },
      keyframes: {
        'background-shine': {
          from: {
            backgroundPosition: '0 0'
          },
          to: {
            backgroundPosition: '-200% 0'
          }
        },
        "border-width": {
          "from":{
            "width":"10px",
            "opacity":"0"
          },
          "to":{
            "width":"300px",
            "opacity":"1"
          }
        }
      }
    }
  },
  plugins: []
}
