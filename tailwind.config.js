/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        seashellColor: "#FFFCFA",
        raisinBlackColor: "#221F20",
        alabasterColor: "#F9F4EE",
        powderBlueColor: "#EEF4F9",
        mutedGrayishTone: "#7A7777",
      },
      fontFamily: {
        fontWorkSans: ["var(--font-work-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
