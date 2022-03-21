module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        tablet: "400px minmax(0, 1fr)",
        mobile: "minmax(0, 1fr)",
        "card-mobile": "minmax(0, 1fr)",
        "card-tablet": "auto 1fr auto",
      },
      colors: {
        primary: "#115e59cc",
      },
      minWidth: {
        "detail-tablet": "686px",
        "detail-mobile": "320px",
      },
      height: {
        100: "25rem",
      },
    },
  },
  plugins: [],
};
