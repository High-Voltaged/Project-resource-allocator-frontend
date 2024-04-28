/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./node_modules/primereact/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#a5b4fc",
        secondary: "#bfdbfe",
        featured: "#4338ca",
        title: "#334155",
        subtitle: "#94a3b8",
      },
    },
  },
  plugins: [],
};
