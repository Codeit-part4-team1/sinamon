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
        main: "hsl(var(--primary))",
        sub: "hsl(var(--secondary))",
        white: {
          ffffff: "hsl(var(--white))",
          f9f9f9: "hsl(var(--background))"
        },
        black: "hsl(var(--black))",
        gray: {
          "4b4b4b": "hsl(var(--gray4b4b4b))",
          "79747e": "hsl(var(--gray79747e))",
          a4a1aa: "hsl(var(--graya4a1aa))",
          adaeb8: "hsl(var(--grayadaeb8))",
          cbc9cf: "hsl(var(--graycbc9cf))",
          dddddd: "hsl(var(--graydddddd))",
          eeeeee: "hsl(var(--grayeeeeee))",
          fafafa: "hsl(var(--grayfafafa))"
        },
        red: {
          ff472e: "hsl(var(--redff472e))",
          ffe4e0: "hsl(var(--redffe4e0))"
        },
        green: {
          "00ac07": "hsl(var(--green00ac07))"
        },
        orange: {
          ff7c1d: "hsl(var(--orangeff7c1d))",
          fff4e8: "hsl(var(--orangefff4e8))"
        },
        yellow: {
          ffc23d: "hsl(var(--yellowffc23d))"
        },
        blue: {
          "0085ff": "hsl(var(--blue0085ff))",
          "2eb4ff": "hsl(var(--blue2eb4ff))",
          e5f3ff: "hsl(var(--bluee5f3ff))"
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
