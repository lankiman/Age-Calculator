/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.js"],
  theme: {
    screens: {
      sm: "400px",
      md: "1024px"
    },

    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
      custom: ["Poppins", "sans-serif"]
    },
    fontWeight: {
      normal: 400,
      bold: 700,
      extrabold: 1000
    },
    extend: {
      colors: {
        Purple: "hsl(259, 100%, 65%)",
        Lightred: "hsl(0, 100%, 67%)",
        White: "hsl(0, 0%, 100%)",
        Offwhite: "hsl(0, 0%, 94%)",
        Lightgrey: "hsl(0, 0%, 86%)",
        Smokeygrey: "hsl(0, 1%, 44%)",
        Offblack: "hsl(0, 0%, 8%)"
      }
    }
  },
  plugins: []
};
