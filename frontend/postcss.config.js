module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],  // Ensures Tailwind scans the right files
  theme: {
    extend: {
      colors: {
        primary: "#FF9800",
        background: "#121212",
        card: "#1E1E1E",
        text: "#FFFFFF",
        muted: "#B0BEC5",
      },
    },
  },
  plugins: [],
};
