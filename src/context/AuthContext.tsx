import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserRole, AuthContextType } from '../types';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const USER_STORAGE_KEY = 'business_nexus_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // BYPASS LOGIN: Yeh ab kisi bhi credentials ko accept kar lega
  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Dummy user data jo har login par set ho jayega
      const dummyUser: User = {
        id: 'user123',
        name: 'Sadia Admin',
        email: email,
        role: role,
        avatarUrl: `https://ui-avatars.com/api/?name=Sadia&background=random`,
        bio: 'Project Administrator',
        isOnline: true,
        createdAt: new Date().toISOString()
      };

      setUser(dummyUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(dummyUser));
      toast.success('Bypass Login Successful!');
    } catch (error) {
      toast.error('Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    toast.success('Logged out');
  };

  // Khali functions taake errors na aayein
  const register = async () => {};
  const forgotPassword = async () => {};
  const resetPassword = async () => {};
  const updateProfile = async () => {};

  const value = {
    user,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};