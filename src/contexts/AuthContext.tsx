// --- START OF FILE: contexts/AuthContext.tsx ---

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types';
import { authService } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  // Add the new function to our context's type definition
  updateUser: (updatedData: Partial<User>) => Promise<void>;
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
          logout();
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

  // --- ADD THIS NEW FUNCTION ---
  const updateUser = async (updatedData: Partial<User>) => {
    // Call the API service to update the user in the backend
    const updatedUserFromServer = await authService.updateCurrentUser(updatedData);
    // Refresh the user state with the updated data returned from the server
    setUser(updatedUserFromServer); 
  };
  // --- END OF NEW FUNCTION ---

  // Add the new updateUser function to the context value
  const value = { isAuthenticated, user, login, logout, isLoading, updateUser };

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

// --- END OF FILE: contexts/AuthContext.tsx ---