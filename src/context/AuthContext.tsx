import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserRole, AuthContextType } from '../types';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('business_nexus_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    setIsLoading(true);
    // Instant Login Bypass
    const dummyUser: User = {
      id: 'admin-123',
      name: 'Sadia Admin',
      email: email,
      role: role,
      avatarUrl: `https://ui-avatars.com/api/?name=Sadia&background=random`,
      bio: 'Project Administrator', // Yahan bio add kar di hai error fix karne ke liye
      isOnline: true,
      createdAt: new Date().toISOString()
    };
    
    setUser(dummyUser);
    localStorage.setItem('business_nexus_user', JSON.stringify(dummyUser));
    toast.success('System Bypassed - Welcome!');
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('business_nexus_user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
    register: async () => {},
    forgotPassword: async () => {},
    resetPassword: async () => {},
    updateProfile: async () => {}
  } as AuthContextType;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth error');
  return context;
};