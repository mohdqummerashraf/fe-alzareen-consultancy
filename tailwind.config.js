/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#131B34',
          soft: '#233256',
        },

        route: {
          DEFAULT: '#2C4A7C',
        },

        paper: {
          DEFAULT: '#EEEBE0',
          2: '#E3DFCF',
          3: '#D9D4BF',
        },

        gold: {
          DEFAULT: '#B9862B',
          light: '#E7C77A',
        },

        teal: {
          DEFAULT: '#1F7A6C',
        },

        text: {
          DEFAULT: '#1B1F27',
          soft: '#5B5F6B',
        },

        white: {
          DEFAULT: '#FBFAF6',
        },

        border: {
          DEFAULT: '#E2E8F0',
          light: '#F1F5F9',
          dark: '#CBD5E1',
        },

        success: '#16A34A',
        warning: '#F59E0B',
        danger: '#DC2626',
        info: '#0EA5E9',
      },

      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },

      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        full: '9999px',
      },

      boxShadow: {
        xs: '0 1px 2px rgba(15,23,42,.05)',
        sm: '0 4px 10px rgba(15,23,42,.05)',
        card: '0 8px 24px rgba(15,23,42,.06)',
        md: '0 12px 32px rgba(15,23,42,.08)',
        lg: '0 20px 48px rgba(15,23,42,.10)',
        xl: '0 32px 80px rgba(15,23,42,.14)',
        hero: '0 30px 60px rgba(19,27,52,.35)',
        navbar: '0 2px 10px rgba(15,23,42,.05)',
      },

      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
      },

      letterSpacing: {
        tighter: '-0.04em',
        heading: '-0.03em',
        label: '0.08em',
      },

      transitionTimingFunction: {
        smooth: 'cubic-bezier(.4,0,.2,1)',
      },

      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },

        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },

        pulseSlow: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '.6' },
        },
      },

      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeUp: 'fadeUp .6s ease',
        pulseSlow: 'pulseSlow 2.5s infinite',
      },

      backgroundImage: {
        hero: 'linear-gradient(180deg,#EEEBE0 0%,#E3DFCF 100%)',
        primary: 'linear-gradient(135deg,#2C4A7C 0%,#131B34 100%)',
        secondary: 'linear-gradient(135deg,#1F7A6C 0%,#233256 100%)',
        footer: 'linear-gradient(135deg,#131B34 0%,#233256 100%)',
        card: 'linear-gradient(180deg,#FBFAF6 0%,#EEEBE0 100%)',
      },

      maxWidth: {
        container: '1280px',
      },

      screens: {
        xs: '480px',
      },
    },
  },

  plugins: [],
};
