import type { Config } from "tailwindcss";

/**
 * NOTA: Este proyecto usa Tailwind CSS v4, donde la mayoría de la configuración
 * del tema vive en CSS (src/app/globals.css) mediante @theme inline.
 * Este archivo se mantiene como referencia/documentación de los tokens.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — Naranja Industrial
        primary: {
          DEFAULT: "var(--primary)",
          50: "#FEF3EC",
          100: "#FDE0D0",
          200: "#FBC0A1",
          300: "#F99F72",
          400: "#F77F43",
          500: "#E85D24",
          600: "#D14D18",
          700: "#BA3D12",
          800: "#A32D0C",
          900: "#8C1D06",
        },
        // Secondary — Azul Industrial Oscuro
        secondary: {
          DEFAULT: "var(--secondary)",
          50: "#F0F2F5",
          100: "#D9DEE5",
          200: "#B3BCCB",
          300: "#8D9BB1",
          400: "#677A97",
          500: "#415A7D",
          600: "#2A3E5C",
          700: "#1C2D45",
          800: "#0F1923",
          900: "#0A1018",
        },
        // Accent Gold — Dorado Certificación
        "accent-gold": {
          DEFAULT: "var(--accent-gold)",
          50: "#FBF7ED",
          100: "#F5EBCE",
          200: "#EBD79D",
          300: "#E1C36C",
          400: "#D7AF3B",
          500: "#C9A84C",
          600: "#B8983D",
          700: "#A7882E",
          800: "#96781F",
          900: "#856810",
        },
        // Emergency — Rojo
        emergency: {
          DEFAULT: "#DC2626",
          50: "#FEF2F2",
          100: "#FECACA",
          200: "#FCA5A5",
          300: "#F87171",
          400: "#EF4444",
          500: "#DC2626",
          600: "#B91C1C",
          700: "#991B1B",
          800: "#7F1D1D",
          900: "#450A0A",
        },
        // Neutral — Grises
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        // Legacy semantic aliases
        "primary-hover": "var(--primary-hover)",
        "primary-light": "var(--primary-light)",
        "secondary-elevated": "var(--secondary-elevated)",
        dark: "var(--dark)",
        body: "var(--body)",
        muted: "var(--muted)",
        "bg-light": "var(--bg-light)",
        "bg-warm": "var(--bg-warm)",
        "text-on-dark": "var(--text-on-dark)",
        "text-on-dark-muted": "var(--text-on-dark-muted)",
        whatsapp: "var(--whatsapp)",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "ui-sans-serif", "system-ui", "sans-serif"],
        "space-grotesk": ["var(--font-space-grotesk)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-outfit)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-outfit)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-md": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "700" }],
        "heading-lg": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "heading-md": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.005em", fontWeight: "600" }],
        "heading-sm": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "500" }],
      },
      spacing: {
        "space-1": "0.5rem",
        "space-2": "1rem",
        "space-3": "1.5rem",
        "space-4": "2rem",
        "space-5": "2.5rem",
        "space-6": "3rem",
        "space-8": "4rem",
        "space-10": "5rem",
        "space-12": "6rem",
        "space-16": "8rem",
        "space-20": "10rem",
      },
      maxWidth: {
        container: "1280px",
        "container-sm": "768px",
        "container-md": "1024px",
      },
      borderRadius: {
        pill: "9999px",
        card: "16px",
        badge: "8px",
      },
      animation: {
        "pulse-emergency": "pulse-emergency 3s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 45s linear infinite",
      },
      keyframes: {
        "pulse-emergency": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(220, 38, 38, 0.7)" },
          "50%": { boxShadow: "0 0 0 12px rgba(220, 38, 38, 0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};

export default config;
