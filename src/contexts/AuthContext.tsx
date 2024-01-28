import api from '@/services/api';
import { setAuthorizationHeader } from '@/services/authService';
import React, { createContext, useEffect, useState } from 'react';

export interface AuthContextProps {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = localStorage.getItem('@token');
  useEffect(() => {
    if (token) {
      setAuthorizationHeader(token);
      setIsAuthenticated(true);
    }
  }, [token]);

  const login = async (username: string, password: string): Promise<void> => {
    // Chame a sua API para autenticar o usuário
    // Se a autenticação for bem-sucedida, atualize o estado e configure o token
    try {
      // Substitua esta lógica com a chamada à sua API de autenticação
      const response = await api.post('/auth/login', { username, password });
      const { token } = response.data;

      setAuthorizationHeader(token);
      localStorage.setItem('@token', token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const logout = (): void => {
    // Remova o token do localStorage e redefina o estado de autenticação
    localStorage.removeItem('@token');
    setAuthorizationHeader('');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
