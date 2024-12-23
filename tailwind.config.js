/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        canveat: ['Caveat', 'cursive'],
      },
      colors: {
        "primary": "#2563eb",
        "secondary": "#6b7280",
        "accent": "#10b981",
        "neutral": "#4b5563",
        "base": {
          100: "#fdfdfd",
          200: "#f1f2f4",
          300: "#e5e7eb",
          400: "#d1d5db",
        },
        "info": "#3b82f6",
        "success": "#22c55e",
        "warning": "#f59e0b",
        "error": "#ef4444",
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.5' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
    },
  },
  plugins: [],
}