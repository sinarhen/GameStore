import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { AuthDialogProvider } from './contexts/AuthDialogContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    
    <AuthProvider>
      <FavoritesProvider>
        <AuthDialogProvider>
          <App />
        </AuthDialogProvider>
      </FavoritesProvider>
    </AuthProvider>
    <Toaster position="bottom-right" />

  </React.StrictMode>
);
