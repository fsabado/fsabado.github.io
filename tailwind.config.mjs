/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#3b82f6',
        },
        secondary: {
          DEFAULT: '#7c3aed',
          dark: '#8b5cf6',
        },
        accent: {
          DEFAULT: '#059669',
          dark: '#10b981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};
