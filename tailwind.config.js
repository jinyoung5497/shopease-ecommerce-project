/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "1450px": { max: "1450px" },
      // => @media (max-width: 1450px) { ... } desktop

      "1350px": { max: "1350px" },
      // => @media (max-width: 1350px) { ... } desktop

      "1250px": { max: "1250px" },
      // => @media (max-width: 1250px) { ... } desktop

      "1150px": { max: "1150px" },
      // => @media (max-width: 1150px) { ... } desktop

      "1050px": { max: "1050px" },
      // => @media (max-width: 1050px) { ... } tablet

      "950px": { max: "950px" },
      // => @media (max-width: 950px) { ... } tablet

      "850px": { max: "850px" },
      // => @media (max-width: 850px) { ... } tablet

      "750px": { max: "750px" },
      // => @media (max-width: 750px) { ... } mobile

      "650px": { max: "650px" },
      // => @media (max-width: 650px) { ... } mobile

      "550px": { max: "550px" },
      // => @media (max-width: 550px) { ... } mobile

      "450px": { max: "450px" },
      // => @media (max-width: 450px) { ... } mobile

      "400px": { max: "400px" },
      // => @media (max-width: 400px) { ... } mobile

      "350px": { max: "350px" },
      // => @media (max-width: 350px) { ... } mobile
    },
    extend: {
      colors: {
        white: "#FFFFFF",
        "white-off": "#FAFAFA",
        purple: "#633CFF",
        "purple-light": "#BEADFF",
        "purple-lighter": "#EFEBFF",
        black: "#333333",
        gray: "#737373",
        "light-gray": "#D9D9D9",
        red: "#FF3939",
      },
    },
  },
  plugins: [],
};
