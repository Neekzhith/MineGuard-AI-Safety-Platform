import animatePlugin from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-soft': 'var(--color-surface-soft)',
        'surface-strong': 'var(--color-surface-strong)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        'text-strong': 'var(--color-text-strong)',
        accent: 'var(--color-accent)',
        'accent-strong': 'var(--color-accent-strong)',
        highlight: 'var(--color-highlight)',
        border: 'var(--color-border)',
      },
      boxShadow: {
        card: '0 10px 30px rgba(15, 20, 34, 0.08)',
      },
    },
  },
  plugins: [animatePlugin],
};


