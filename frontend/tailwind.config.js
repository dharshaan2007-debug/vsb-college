/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1E3D",       // deep navy - primary
        circuit: "#123A6B",   // secondary navy
        volt: "#2FB8FF",      // electric blue accent
        mist: "#F4F8FC",      // near-white background
        steel: "#5C6B7A",     // muted body text
      },
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(47,184,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(47,184,255,0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "24px 24px",
      },
    },
  },
  plugins: [],
};
