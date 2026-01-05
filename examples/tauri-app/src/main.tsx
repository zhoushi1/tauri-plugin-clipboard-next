import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// 挂载React应用
ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);