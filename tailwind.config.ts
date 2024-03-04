import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1280px"
    },
    container: {
      center: true,
      padding: "2rem"
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
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        main: "#553311",
        sub: "#E6E2DE",
        black: "#1B1B1B",
        white: {
          ffffff: "#FFFFFF",
          f9f9f9: "#F9F9F9"
        },
        gray: {
          "4b4b4b": "#4B4B4B",
          "79747e": "#79747E",
          a4a1aa: "#A4A1AA",
          adaeb8: "#ADAEB8",
          cbc9cf: "#CBC9CF",
          dddddd: "#DDDDDD",
          eeeeee: "#EEEEEE"
        },
        red: {
          ff472e: "#FF472E",
          ffe4e0: "#FFE4E0"
        },
        green: {
          "00ac07": "#00AC07"
        },
        orange: {
          ff7c1d: "#FF7C1D",
          fff4e8: "#FFF4E8"
        },
        yellow: {
          ffc23d: "#FFC23D"
        },
        blue: {
          "0085ff": "#0085FF",
          "2eb4ff": "#2EB4FF",
          e5f3ff: "#E5F3FF"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;

export default config;
