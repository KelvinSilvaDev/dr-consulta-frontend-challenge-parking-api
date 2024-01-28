import {useContext} from 'react';
import { AuthContext, AuthContextProps } from '@/contexts/AuthContext';

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};