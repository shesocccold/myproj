/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { colors: {
      customColor: '#E3D4C1', // Define your custom color here
      customColor1:'#7C6950',
    },},
  },
  plugins: [],
}