import {useContext} from 'react';
import AuthContext from '../contexts/AuthContext';

export function useCurrentUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useCurrentUser must be used within a AuthProvider');
  }

  return context;
}