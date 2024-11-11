/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/**/*{.js,.ts,.jsx,.tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#031749",
        gray: "#666666",
        "gray-light": "#858585",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
