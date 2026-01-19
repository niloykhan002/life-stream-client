/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#be123c",
        secondary: "#ffe4e6",
        dark1: "rgb(19 19 19)",
        dark2: "rgba(19, 19, 19, 0.7)",
        dark3: "rgba(19, 19, 19, 0.6)",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
