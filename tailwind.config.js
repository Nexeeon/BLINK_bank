/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBF9FF',
        primary: {
          50: '#F5F0FF',
          100: '#EDE6FF',
          200: '#DCCEFF',
          300: '#C4ADFF',
          400: '#AC8EFF',
          500: '#9B6BFF',
          600: '#8B5CF6',
          700: '#7445E0',
          800: '#5C33B8',
          900: '#3E227E',
        },
        pinky: {
          50: '#FFF1F6',
          100: '#FFE4EE',
          200: '#FFC9DD',
          300: '#FFA5C7',
          400: '#FF85B3',
          500: '#F9679F',
          600: '#E44A85',
          700: '#C23268',
        },
        ink: '#1E1633',
        inkSoft: '#5A4D73',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        bento: '24px',
        'bento-lg': '32px',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(139, 92, 246, 0.08)',
        lift: '0 18px 45px rgba(139, 92, 246, 0.16)',
        glow: '0 0 0 4px rgba(155, 107, 255, 0.15)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(3deg)' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'pop-in': 'pop-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        wiggle: 'wiggle 0.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
