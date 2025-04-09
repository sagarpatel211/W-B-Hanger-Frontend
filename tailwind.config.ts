import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
      colors: {
        background: '#ffffff',
        foreground: '#000000',
      },
    },
  },
  plugins: [],
};

export default config;
