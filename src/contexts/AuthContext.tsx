
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<{
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
} | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({ user: null, isLoading: true });

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('shajogouri-user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setState({ user, isLoading: false });
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        setState({ user: null, isLoading: false });
      }
    } else {
      setState({ user: null, isLoading: false });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check for admin credentials
      const isAdmin = email === 'sonaton.fl@gmail.com' && password === '01753840087';
      
      // For demo purposes, accept any valid email/password combination
      if (email.includes('@') && password.length >= 6) {
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          isAdmin
        };
        
        setState({ user, isLoading: false });
        localStorage.setItem('shajogouri-user', JSON.stringify(user));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email.includes('@') && password.length >= 6 && name.length >= 2) {
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name,
          isAdmin: false
        };
        
        setState({ user, isLoading: false });
        localStorage.setItem('shajogouri-user', JSON.stringify(user));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setState({ user: null, isLoading: false });
    localStorage.removeItem('shajogouri-user');
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
