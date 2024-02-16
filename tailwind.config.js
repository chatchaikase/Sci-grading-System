/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["light", "dark", "garden", {
      mytheme: {
        "primary": "#a991f7",
        "secondary": "#f6d860",
        "accent": "#37cdbe",
        "neutral": "#3d4451",
        "base-100": "#ffffff",
        "bg-Select": "#9ca3af"
      },
    },],
  },
  darkMode: "class",
  plugins: [
    require("daisyui"),
    nextui(),
  ],
};