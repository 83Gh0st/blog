/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Your application's source files
    "./node_modules/flowbite/**/*.js", // Flowbite components
    require("flowbite-react/tailwind").content(), // Flowbite React components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'), // Flowbite plugin
  ],
};
