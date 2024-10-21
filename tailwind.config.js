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
      },
      colors: {
        "primary": "#2563eb",    // Bleu principal pour les actions et éléments importants
        "secondary": "#6b7280",  // Gris pour les éléments secondaires
        "accent": "#10b981",     // Vert pour les accents et validations
        "neutral": "#4b5563",    // Gris foncé pour le texte principal
        "base": {
          100: "#fdfdfd",        // Blanc pour le fond principal
          200: "#f1f2f4",        // Gris très clair pour les fonds secondaires
          300: "#e5e7eb",        // Gris clair pour les bordures et séparateurs
          400: "#d1d5db",        // Gris moyen pour les éléments inactifs
        },
        "info": "#3b82f6",       // Bleu clair pour les informations
        "success": "#22c55e",    // Vert pour les succès
        "warning": "#f59e0b",    // Orange pour les avertissements
        "error": "#ef4444",      // Rouge pour les erreurs
      }
    }
  },
  plugins: [],
}

