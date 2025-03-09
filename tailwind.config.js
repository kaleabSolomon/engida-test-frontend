/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          400: "#FF6B35",
          500: "#FF5722",
        },
        purple: {
          500: "#7E3FF2",
        },
      },
    },
  },
  plugins: [],
};
