import type { Config } from "tailwindcss";

const config = {
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
      padding: "1.5rem",
      screens: {
        "2xl": "1600px",
      },
    },
    colors: {
      primary: "#003A28",
      "primary-darker": "#002A1D",
      secondary: "#38DAA6",
      brand: "#008359",
      "brand-secondary": "#BCFFE9",
      background: "#F9F3E8",
      "background-secondary": "#FFFAF0",
      "background-muted": "#EEDDBE",
      "background-invert": "#001911",
      "background-icon": "#005E40",
      white: "#FFFFFF",
      black: "#000000",
      input: "#DBE3E6",
      "input-foreground": "#909799",
      "input-secondary": "#EFF4F5",
      transparent: "transparent",
      light: "#EBFFF9",
      minimal: "#CFD6D9",
      gray: "#474B4D",
      accent: "#99ddc7",
    },
    boxShadow: {
      none: "0 0 0 rgba(0,0,0,0)",
      expand: "0 5rem 8rem rgba(0,0,0,.12)",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        display: ["var(--font-tt-bluescreens)", "sans-serif"],
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
      transitionTimingFunction: {
        kubby: "cubic-bezier(0.22,1,0.36,1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
