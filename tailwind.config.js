/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        heroImg: "url('/src/assets/jot-bg.jpg')",
      },
    },
  },
  plugins: [],
};
