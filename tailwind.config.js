// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lexend', 'sans-serif'],
      },
      colors: {
        'peach': { DEFAULT: '#FFC0A0', '50': '#FFF5EE', '100': '#FFEADB', '200': '#FFD5BD', '300': '#FFC0A0', '400': '#FFAB82', '500': '#FF9664', '600': '#F5824B', '700': '#E06E3A', '800': '#C25A2E', '900': '#A34C25' },
        'clay': { DEFAULT: '#D9A37A', '50': '#F9F3EE', '100': '#F3E7DB', '200': '#E6B89C', '300': '#D9A37A', '400': '#CC8F58', '500': '#BF7B36', '600': '#A9692E', '700': '#8F5726', '800': '#75451E', '900': '#5C3617' },
        'coral': { DEFAULT: '#F5A882', '50': '#FEF3EC', '100': '#FDE7D9', '200': '#F9CEB8', '300': '#F5A882', '400': '#F28F5D', '500': '#EF7638', '600': '#D9662E', '700': '#B85326', '800': '#97431E', '900': '#7C3619' },
        'melon': { DEFAULT: '#FF9E6E', '50': '#FFF5F0', '100': '#FFEBE0', '200': '#FFD6C2', '300': '#FFC2A3', '400': '#FF9E6E', '500': '#FF8A50', '600': '#F57737', '700': '#E0632C', '800': '#C25021', '900': '#A3401A' },
        'spicy-amber': { DEFAULT: '#FA9657', '50': '#FFF5ED', '100': '#FFECDA', '200': '#FFD9B6', '300': '#FFC591', '400': '#FFB26D', '500': '#FA9657', '600': '#F08744', '700': '#D9733A', '800': '#B85D2E', '900': '#974A24' },
        'cocoa': { DEFAULT: '#947A7A', '50': '#FDFBFB', '100': '#F9F5F5', '200': '#EFEDED', '300': '#E5E0E0', '400': '#CFC6C6', '500': '#B3A6A6', '600': '#A39393', '700': '#947A7A', '800': '#705C5C', '900': '#453838' },
      }
    },
  },
  plugins: [],
}