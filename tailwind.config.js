/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#be123c",
        secondary: "#ffe4e6",
      },
    },
  },
  plugins: [require("daisyui")],
};
