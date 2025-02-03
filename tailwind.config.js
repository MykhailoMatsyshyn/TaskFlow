/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        background: "var(--primary-bg)",
        "background-secondary": "var(--secondary-bg)",
        "background-highlight": "var(--highlight-bg)",
        "neutral-background": "var(--neutral-bg)",
        input: "var(--input-bg)",
        text: "var(--text-color)",
        "text-inverted": "var(--text-inverted)",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(180deg, rgba(196, 196, 196, 0) 25%, #BEDBB0 92.19%)",
      },
      screens: {
        xl: "1440px",
      },
      gridTemplateColumns: {
        layout: "260px 1fr",
      },
      gridTemplateRows: {
        layout: "auto 1fr",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
