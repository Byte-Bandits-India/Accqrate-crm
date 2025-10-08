/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
      },

      letterSpacing: {
        heading: "-0.05em",
        para: "-0.02em",
      },

      keyframes: {
        scrollLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
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
        scrollLeft: "scrollLeft 50s linear infinite",
        scrollRight: "scrollRight 50s linear infinite",
        skeleton: "skeleton 1.2s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addComponents }) {
      addComponents({
        ".text-fluid-h1": {
          fontSize: "36px",
          lineHeight: "1.2", // ~43px
          "@screen md": { fontSize: "54px", lineHeight: "1.2" }, // ~65px
          "@screen lg": { fontSize: "72px", lineHeight: "1.2" }, // ~86px
        },
        ".text-fluid-h2": {
          fontSize: "24px",
          lineHeight: "1.3", // ~31px
          "@screen md": { fontSize: "32px", lineHeight: "1.3" }, // ~42px
          "@screen lg": { fontSize: "36px", lineHeight: "1.3" }, // ~47px
        },
        ".text-fluid-h3": {
          fontSize: "20px",
          lineHeight: "1.35", // ~27px
          "@screen md": { fontSize: "24px", lineHeight: "1.35" }, // ~32px
          "@screen lg": { fontSize: "30px", lineHeight: "1.35" }, // ~40px
        },
        ".text-fluid-body": {
          fontSize: "16px",
          lineHeight: "1.5", // ~24px
          "@screen md": { fontSize: "18px", lineHeight: "1.5" }, // ~27px
          "@screen lg": { fontSize: "20px", lineHeight: "1.5" }, // ~30px
        },
        ".text-fluid-small": {
          fontSize: "14px",
          lineHeight: "1.5", // ~21px
          "@screen md": { fontSize: "16px", lineHeight: "1.5" }, // ~24px
          "@screen lg": { fontSize: "18px", lineHeight: "1.5" }, // ~27px
        },
      });
    },
  ],
};
