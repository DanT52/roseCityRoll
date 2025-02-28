import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { login as apiLogin, logout as apiLogout, checkAuth as apiCheckAuth } from '../services/auth';

interface AuthContextData {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const authenticated = await apiCheckAuth();
      if (!authenticated) {
        apiLogout(); // remove token if expired
      }
      setIsLoggedIn(authenticated);
    };
    verifyAuth();
  }, []);

  const login = async (username: string, password: string) => {
    await apiLogin(username, password);
    setIsLoggedIn(true);
  };

  const logout = () => {
    apiLogout();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};