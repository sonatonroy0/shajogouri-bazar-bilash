
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  area?: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profile: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('shajogouri-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('shajogouri-user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    if (email === 'sonaton.fl@gmail.com' && password === '01753840087') {
      const adminUser: User = {
        id: '1',
        name: 'Sonaton Admin',
        email: 'sonaton.fl@gmail.com',
        isAdmin: true
      };
      setUser(adminUser);
      localStorage.setItem('shajogouri-user', JSON.stringify(adminUser));
      return true;
    } else if (email && password) {
      // Regular user login
      const regularUser: User = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        isAdmin: false
      };
      setUser(regularUser);
      localStorage.setItem('shajogouri-user', JSON.stringify(regularUser));
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    if (email && password && name) {
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        isAdmin: false
      };
      setUser(newUser);
      localStorage.setItem('shajogouri-user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const updateProfile = async (profile: Partial<User>): Promise<void> => {
    if (user) {
      const updatedUser = { ...user, ...profile };
      setUser(updatedUser);
      localStorage.setItem('shajogouri-user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shajogouri-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
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
