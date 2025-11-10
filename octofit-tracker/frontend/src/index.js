import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Build backend base URL from codespace name environment variable.
// If REACT_APP_CODESPACE_NAME is not set the app falls back to localhost:8000.
const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME;
const API_BASE = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

console.log('[index] Using API base URL:', API_BASE);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
