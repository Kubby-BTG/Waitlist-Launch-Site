import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      primary: "#003928",
      "primary-darker": "#002A1D",
      secondary: "#38DAA6",
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
      cream: "#f9f3e8",
      //
      danger: "#dc2626",
      success: "#22c55e",
      warning: "#ffc409",
      //
      brand: {
        default: "#008359",
        "50": "#EDFAF8",
        "100": "#DAF2EE",
        "200": "#A8E0D5",
        "300": "#7ACCBA",
        "400": "#32A889",
        "500": "#008359",
        "600": "#00754C",
        "700": "#00613A",
        "800": "#004F2B",
        "900": "#003B1D",
        "950": "#002611",
      },
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
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      transitionTimingFunction: {
        kubby: "cubic-bezier(0.22,1,0.36,1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
