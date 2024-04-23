/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  mode: 'jit',
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      backgroundImage: {
        'background-white' : 'linear-gradient(to top, #FFFCFC 100%)',
        'background-grey' : 'linear-gradient(to top, #F0F0F0 13%, #979797 66%, #FFFCFC 100%)',
        'background-yellow': 'linear-gradient(to top, #FFF389 13%, #FFC5AC 50%, #FFFCFC 100%)',
        'background-green': 'linear-gradient(to top, #FFFCAC 0%, #B9E7BB 44%, #FFFCFC 100%)',
        'background-kiwi': 'linear-gradient(to top, #FFFDEF 0%, #DDF873 50%, #FFFCFC 100%)',
        'background-purple': 'linear-gradient(to top, #FCFFD8 0%, #EAD3FC 62%, #FFFCFC 100%)',
        'background-pink': 'linear-gradient(to top, #FFFBE9 0%, #FF93FB 64%, #FFFCFC 94%)',
        'background-sky': 'linear-gradient(to top, #F4FFEF 0%, #A9FFFA 62%, #FFFCFC 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
    fontFamily: {
      Pretendard: ['Pretendard'],
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwind-scrollbar-hide'),
    // ... any other plugins
  ],
};
