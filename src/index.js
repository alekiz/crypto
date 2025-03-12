import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from "react-dom/client";


import App from './App.js';
import store from './app/store.js';
import 'antd/dist/reset.css';
import { AuthProvider } from './context/AuthProvider.js';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
   <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);