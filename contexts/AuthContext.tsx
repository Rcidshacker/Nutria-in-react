// --- START OF NEW FILE: contexts/AuthContext.tsx ---

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types'; // We will add this type in the next step
import { authService } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
          setIsAuthenticated(true);
        } catch (error) {
          authService.logout();
        }
      }
      setIsLoading(false);
    };
    checkLoggedIn();
  }, []);

  const login = async (email: string, password: string) => {
    await authService.signIn(email, password);
    const currentUser = await authService.getCurrentUser();
    setUser(currentUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = { isAuthenticated, user, login, logout, isLoading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// --- END OF NEW FILE: contexts/AuthContext.tsx ---