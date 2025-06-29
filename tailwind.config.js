/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAFA',
        text: '#191919',
        accent: '#FF4D8B',
        button: '#3F3F3F',
        active: '#FCA311',
        card: '#FFFFFF',
        muted: '#F0F0F0',
        border: '#E5E5E5',
        shadow: 'rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 10px 30px var(--shadow)',
        'hover': '0 15px 35px rgba(0, 0, 0, 0.1)',
        'button': '0 4px 15px rgba(255, 77, 139, 0.3)',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--accent), var(--button))',
        'gradient-text': 'linear-gradient(135deg, var(--accent), var(--active))',
      },
    },
  },
  plugins: [],
};