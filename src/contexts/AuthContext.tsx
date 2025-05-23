import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  whatsappConnected: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  connectWhatsApp: () => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  businessName: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // In a real implementation, this would be an API call
      // For demo purposes, we'll simulate a successful login
      const mockUser: User = {
        id: '123',
        name: 'Demo User',
        email: email,
        businessName: 'Demo Business',
        whatsappConnected: false
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      // In a real implementation, this would be an API call
      // For demo purposes, we'll simulate a successful registration
      const mockUser: User = {
        id: '123',
        name: userData.name,
        email: userData.email,
        businessName: userData.businessName,
        whatsappConnected: false
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const connectWhatsApp = async () => {
    try {
      setIsLoading(true);
      // In a real implementation, this would initiate the WhatsApp Cloud API connection
      // For demo purposes, we'll simulate a successful connection
      if (user) {
        const updatedUser = { ...user, whatsappConnected: true };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('WhatsApp connection failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    connectWhatsApp
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};