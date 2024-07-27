/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
    colors: {
      violetcustom: "rgb(	231, 208, 255)",
    },
    borderRadius: {
      custom: "2.875rem",
    },
  },
  plugins: [],
};
