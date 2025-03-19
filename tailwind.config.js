export default  {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        text: "var(--color-text)",
        primary: "var(--color-primary)",
        primaryLight: "var(--color-primary-light)",
        bgDarker: "var(--color-bg-darker)"
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        latoBold: ["Lato-Bold", "sans-serif"],
      },
    },
    container: {
      center: true, 
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        "2xl": "1600px",
      },
    },
  },
  plugins: [],
};
