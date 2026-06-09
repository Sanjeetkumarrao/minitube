/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#FF0000",
        dark: {
          bg: "#0f0f0f",
          surface: "#1a1a1a",
          card: "#212121",
          border: "#3d3d3d",
          text: "#f1f1f1",
          muted: "#aaaaaa",
        },
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
