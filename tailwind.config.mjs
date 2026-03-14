/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: '#0f0f13',
        surface: '#1a1a24',
        border: '#2a2a3a',
        accent: '#6366f1',
        'accent-2': '#a78bfa',
        'text-base': '#e2e8f0',
        'text-muted': '#94a3b8',
        success: '#10b981',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
