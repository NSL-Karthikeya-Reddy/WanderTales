/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["Poppins", "sans-serif"],
      // Adding more font variations
      sans: ["Poppins", "system-ui", "sans-serif"],
      serif: ["Georgia", "serif"],
    },
    extend: {
      // Colors used in the project
      colors: {
        primary: "#05B6D3",
        secondary: "#EF863E",
        // Adding theme-specific colors
        zinc: {
          750: "#313438",  // Custom zinc shade
          850: "#202124",  // Custom zinc shade
        },
        // Adding yellow shades to match your UI
        yellow: {
          400: "#FBBF24",
          500: "#F59E0B",
        }
      },
      backgroundImage: {
        'login-bg-img': "url('./src/assets/images/bg-image.png')",
        'signup-bg-img': "url('./src/assets/images/signup-bg-img.png')",
        // Adding gradient patterns
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dots': 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      // Adding animation keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        }
      },
      // Adding custom animations
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
        pulseLight: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      // Adding blur values
      backdropBlur: {
        xs: '2px',
      },
      // Adding box shadow values
      boxShadow: {
        'glow': '0 0 20px rgba(255, 255, 255, 0.05)',
        'inner-white': 'inset 0 2px 0 rgba(255, 255, 255, 0.05)',
      }
    },
  },
  plugins: [],
}