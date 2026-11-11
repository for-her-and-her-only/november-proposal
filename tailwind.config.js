/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0D0A0B',
        rose: '#B72A2E',
        'rose-bright': '#C1121F',
        blush: '#F6B8C6',
        warm: '#FFF6F2',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '12%': { opacity: '0.6', transform: 'scale(1.06)' },
          '24%': { opacity: '0.4', transform: 'scale(1)' },
          '36%': { opacity: '0.55', transform: 'scale(1.04)' },
          '50%': { opacity: '0.35', transform: 'scale(1)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        heartbeat: 'heartbeat 5.5s ease-in-out infinite',
        blink: 'blink 1s steps(1) infinite',
      },
    },
  },
  plugins: [],
};
