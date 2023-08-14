/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f1eee3",
        secondary: "#1c212d",
        action: "#dd6367",
        wording: "#343a40",
        "white-custom": "#fdfbf7",
        login: "#323EE2",
        "admin-page": "#F5F4F7",
        star: "#09AC0A",
        "book-card": "#F6F6F6",
      },
    },
  },
  plugins: [],
};
