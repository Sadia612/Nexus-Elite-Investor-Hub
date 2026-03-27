import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContextType } from '../types';
import toast from 'react-hot-toast';

const AuthContext = createContext<any>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(() => {
    const saved = localStorage.getItem('business_nexus_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, role: string) => {
    setIsLoading(true);
    const dummyUser = {
      id: 'admin-123',
      name: 'Sadia Admin',
      email: email,
      role: role,
      avatarUrl: `https://ui-avatars.com/api/?name=Sadia`,
      bio: 'Administrator',
      isOnline: true,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('business_nexus_user', JSON.stringify(dummyUser));
    setUser(dummyUser);
    toast.success('Bypass Active!');
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('business_nexus_user');
  };

  const value = {
    user, login, logout,
    isAuthenticated: !!user,
    isLoading,
    register: async () => {},
    forgotPassword: async () => {},
    resetPassword: async () => {},
    updateProfile: async () => {}
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);