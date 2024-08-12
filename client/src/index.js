import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App'; // Import the main App component

// Render the React application into the root element of the HTML
ReactDOM.render(
  <React.StrictMode>
    <App /> {/* Render the App component */}
  </React.StrictMode>,
  document.getElementById('root') // Specify the HTML element to mount the app on
);
