// Importing necessary libraries and components
import React from 'react'; // Import React library
import ReactDOM from 'react-dom'; // Import ReactDOM for rendering React components
import App from './App'; // Import the main App component

// Rendering the main App component into the DOM

/*
  The ReactDOM.render method takes the App component and mounts it
  onto the HTML element with the id "root", which is found in the public/index.html file.
  
  React.StrictMode is typically used for highlighting potential problems in an application.
  In this file, it has been temporarily removed to avoid strict mode warnings during development.
*/

// Render the App component to the root div in index.html
ReactDOM.render(
  <App />,
  document.getElementById('root') // Targeting the element with id 'root'
);
