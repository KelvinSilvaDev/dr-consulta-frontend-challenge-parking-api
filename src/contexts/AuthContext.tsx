import { axiosPublic } from '@/services/api';
import { setAuthorizationHeader } from '@/services/authService';
import { getTokenFromStorage, isValidToken } from '@/utils/token';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";



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

  useEffect(() => {
    const token = getTokenFromStorage();
    isValidToken(token);
  })

  const navigate = useNavigate();

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const response = await axiosPublic.post('/auth/login', { username, password });
      const { token } = response.data;

      setAuthorizationHeader(token);
      localStorage.setItem('@token', token);
      setIsAuthenticated(true);
      return navigate("/", { replace: true });
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };


  const logout = (): void => {
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
