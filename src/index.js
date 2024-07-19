import React from 'react'
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import './styles.css';
import App  from './App';
import reportWebVitals from './reportWebVitals';

export const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
reportWebVitals();
