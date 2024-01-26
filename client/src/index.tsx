import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { Toaster } from 'react-hot-toast';
import { DialogProvider } from './contexts/DialogContext';
import { CartProvider } from './contexts/CartContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    
    <AuthProvider>
      <FavoritesProvider>
        <DialogProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </DialogProvider>
      </FavoritesProvider>
    </AuthProvider>
    <Toaster position="bottom-right" />

  </React.StrictMode>
);
