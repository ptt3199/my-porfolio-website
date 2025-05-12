import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: '#4A90E2',
        secondary: '#48BB78',
        'dark-text': '#F7FAFC',
        'light-text': '#1A202C',
        border: 'hsl(var(--border))',
        accent: {
          DEFAULT: '#4A90E2',
          muted: 'rgba(74, 144, 226, 0.1)',
          hover: '#357ABD',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#121212',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out forwards',
        'slide-up': 'slideUp 0.5s ease-in-out forwards',
        'spin-slow': 'spin 8s linear infinite',
        'gradient': 'gradient 8s linear infinite',
        'music-bar1': 'musicBar1 1s ease-in-out infinite',
        'music-bar2': 'musicBar2 1s ease-in-out infinite',
        'music-bar3': 'musicBar3 1s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        musicBar1: {
          '0%, 100%': { height: '0.5rem' },
          '50%': { height: '0.75rem' },
        },
        musicBar2: {
          '0%, 100%': { height: '0.75rem' },
          '50%': { height: '0.5rem' },
        },
        musicBar3: {
          '0%, 100%': { height: '0.5rem' },
          '33%': { height: '0.75rem' },
          '66%': { height: '0.5rem' },
        },
      },
      gridTemplateColumns: {
        'fluid': 'repeat(auto-fit, minmax(250px, 1fr))',
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config; 