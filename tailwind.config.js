/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        heroImg: "url('/public/assets/jot-bg.jpg')",
        authbg: "url('/public/assets/auth-bg.png')",
      },
    },
  },
  plugins: [],
};
