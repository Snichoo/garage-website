import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#15355E",
          yellow: "#FDD710",
          black: "#1E1E1E",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "slide-infinite": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
      },
      animation: {
        "slide-infinite": "slide-infinite 45s linear infinite",
        "slide-infinite-slow": "slide-infinite 90s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
