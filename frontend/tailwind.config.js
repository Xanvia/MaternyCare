/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue_primary: "#0D99FF",
        blue_secondary: "#80CAFF",
        blue_tertiary: "#B3DFFF",
        purple_primary: "#BA97FE",
        purple_secondary: "#DDCDFE",
        purple_tertiary: "#EEE6FE",
        pink_primary: "#F580AB",
        pink_secondary: "#F9B8D0",
        pink_tertiary: "#FBD0E0",
        green_primary: "#4CDFB5",
        green_secondary: "#A8F0DB",
        green_tertiary: "#BCF5E4",
        background: "#F5F5F5",
        text_color_1: "#333333",
        text_color_2: "#666666",
        blue_optional: "#CCEAFF",
        pink_optional: "#FDE8EF",
      },
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [require("flowbite/plugin")],
};
