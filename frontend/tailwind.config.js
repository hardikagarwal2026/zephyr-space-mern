module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],  
  theme: {
    extend: {
      colors: {
        primary: "#8A2BE2", // Sexy Purple
        secondary: "#6A0DAD", // Deep Purple
        accent: "#D8BFD8", // Light Lavender
        background: "#0A001F", // Almost Black
        text: "#FFFFFF",
      },
      boxShadow: {
        glow: "0px 0px 20px rgba(138, 43, 226, 0.8)",
        cardGlow: "0px 0px 15px rgba(255, 255, 255, 0.2)",
      },
      backdropBlur: {
        xs: "2px",
        sm: "5px",
        md: "10px",
      },
    },
  },
  plugins: [],
};
