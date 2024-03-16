/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#0f0f0f",
        background: "#ffffff",
        primary: "#416322",
        secondary: "#704532",
        accent: "#c20002",
      },
    },
  },
  plugins: [require("daisyui")],
};
