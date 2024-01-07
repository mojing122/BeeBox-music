/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D8FC05",
        primary_l: "#DDFF1F",
        primary_d: "#96B002",
        primary_comd: "#7381B8",
        primary_coml: "#5173FD",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
