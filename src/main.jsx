import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Import the exact CSS stylesheets preserving all Figma design tokens, layouts, fonts, and keyframes
import './assets/styles/style.css';
import './assets/styles/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
