import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // VoiceCare AI Design System Colors
      colors: {
        // Brand - Primary Navy
        brand: {
          DEFAULT: '#06003F',
          50: '#E8E7F2',
          100: '#D1CFE5',
          200: '#A39FCC',
          300: '#756FB2',
          400: '#473F99',
          500: '#06003F',
          600: '#050033',
          700: '#040027',
          800: '#03001A',
          900: '#02000E',
        },
        // Accent - Electric Orange
        accent: {
          DEFAULT: '#FF4E3A',
          50: '#FFF0EE',
          100: '#FFE1DD',
          200: '#FFC3BB',
          300: '#FFA599',
          400: '#FF8777',
          500: '#FF4E3A',
          600: '#FF6B5A', // Hover state
          700: '#E63E2B',
          800: '#CC2F1D',
          900: '#B3200F',
        },
        // Neutral - For text and backgrounds
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F7',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111111',
          950: '#0A0A0A',
        },
      },
      // Typography scale - Inter font (EXACT from designer-src)
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-md': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.4' }],
        'display-xs': ['1.5rem', { lineHeight: '1.4' }],
      },
      // Spacing scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      // Border radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      // Box shadows
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
        'soft-md': '0 4px 16px -4px rgba(0, 0, 0, 0.08), 0 4px 8px -4px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 8px 32px -8px rgba(0, 0, 0, 0.12), 0 8px 16px -8px rgba(0, 0, 0, 0.04)',
        'soft-xl': '0 16px 48px -12px rgba(0, 0, 0, 0.16), 0 12px 24px -8px rgba(0, 0, 0, 0.04)',
        'glow-brand': '0 0 24px -4px rgba(6, 0, 63, 0.35)',
        'glow-accent': '0 0 24px -4px rgba(255, 78, 58, 0.35)',
      },
      // Animation
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee 40s linear infinite reverse',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      // Background patterns
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
