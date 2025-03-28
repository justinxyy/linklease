
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Updated coral color palette to be less pastel
        coral: {
          "50": "hsl(var(--coral-50))",
          "100": "hsl(var(--coral-100))",
          "200": "hsl(var(--coral-200))",
          "300": "hsl(var(--coral-300))",
          "400": "hsl(var(--coral-400))",
          "500": "hsl(var(--coral-500))",
          "600": "hsl(var(--coral-600))",
          "700": "hsl(var(--coral-700))",
          "800": "hsl(var(--coral-800))",
          "900": "hsl(var(--coral-900))",
          "950": "hsl(var(--coral-950))",
        },
        // Adding brand colors referring to coral for backward compatibility
        brand: {
          "50": "hsl(var(--coral-50))",
          "100": "hsl(var(--coral-100))",
          "200": "hsl(var(--coral-200))",
          "300": "hsl(var(--coral-300))",
          "400": "hsl(var(--coral-400))",
          "500": "hsl(var(--coral-500))",
          "600": "hsl(var(--coral-600))",
          "700": "hsl(var(--coral-700))",
          "800": "hsl(var(--coral-800))",
          "900": "hsl(var(--coral-900))",
          "950": "hsl(var(--coral-950))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
