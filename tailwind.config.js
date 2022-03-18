module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        tablet: "400px minmax(0, 1fr)",
        mobile: "minmax(0, 1fr)",
      },
    },
  },
  plugins: [],
};
