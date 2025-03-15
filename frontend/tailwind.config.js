/*
  Tailwind CSS Configuration File

  This file provides configuration options for Tailwind CSS, allowing customization
  of the styles, content paths, themes, and additional plugins used in the project.
*/

/** @type {import('tailwindcss').Config} */  // TypeScript type-checking for better autocompletion and error checking

// Exporting the Tailwind CSS configuration
module.exports = {
  // Specifies the files Tailwind CSS will scan to identify classes used in the project
  content: [
    './public/index.html',   // Include the HTML file in the public folder to be scanned for Tailwind CSS classes
    './src/**/*.{js,jsx,ts,tsx}', // Include all JavaScript, TypeScript, and JSX files in the src folder for scanning
  ],

  // Theme customization
  theme: {
    extend: {}, // Placeholder for extending the default theme (e.g., adding custom colors, fonts, etc.)
  },

  // Adding Tailwind CSS plugins
  plugins: [], // Currently empty but can be used to add plugins like forms, typography, etc.
};
