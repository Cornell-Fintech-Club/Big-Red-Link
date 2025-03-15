/*
  Configuration for PostCSS

  PostCSS is a tool for transforming CSS with JavaScript plugins.
  This file sets up the PostCSS configuration for the frontend project, which includes the use of Tailwind CSS and Autoprefixer.
*/

// Exporting the PostCSS configuration
module.exports = {
  plugins: {
    // Including Tailwind CSS plugin
    tailwindcss: {}, // Enables Tailwind CSS for utility-first styling across the project

    // Including Autoprefixer plugin
    autoprefixer: {}, // Adds vendor prefixes automatically to ensure compatibility across different browsers
  },
};
