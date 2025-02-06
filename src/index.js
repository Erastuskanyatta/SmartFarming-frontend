import React from 'react'
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import reportWebVitals from './reportWebVitals';

import App from './App';

import './index.css';
import './styles.css';

export const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
reportWebVitals();
