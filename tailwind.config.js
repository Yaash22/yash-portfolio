module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0a0a0a',
        'space-gray': '#1a1a1a',
        'space-blue': '#0066ff',
        'neon-green': '#00ff88',
        'neon-blue': '#00aaff',
        'neon-purple': '#aa00ff',
        'mission-orange': '#ff6600',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'orbit': 'orbit 20s linear infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-neon': {
          '0%': { 
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
            opacity: '1'
          },
          '100%': { 
            boxShadow: '0 0 2px currentColor, 0 0 5px currentColor, 0 0 8px currentColor',
            opacity: '0.8'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
