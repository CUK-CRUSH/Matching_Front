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
        'background-grey' : 'linear-gradient(to top, #FFFCFC 0%, #979797 34%,  #F0F0F0 87%)',
        'background-yellow': 'linear-gradient(to top, #FFFCFC 13%, #FFC5AC 50%, #FFF389 100%)',
        'background-green': 'linear-gradient(to top, #FFFCFC 0%, #B9E7BB 44%, #FFFCAC 100%)',
        'background-kiwi': 'linear-gradient(to top, #FFFDEF 0%, #DDF873 50%, #FFFCFC 100%)',
        'background-purple': 'linear-gradient(to top, #FFFCFC 0%, #EAD3FC 62%, #FCFFD8 100%)',
        'background-pink': 'linear-gradient(to top, #FFFCFC 0%, #FF93FB 62%, #FFFBE9 94%)',
        'background-sky': 'linear-gradient(to top, #FFFCFC 0%, #A9FFFA 62%, #F4FFEF 100%)',
        'background-lock' : 'linear-gradient(to top, #FFFCFC 0%, #F0F0F0 62%, #FFC5AC  100%)',
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
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
      screens : {
        'exceed' : '430px'
      }
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
