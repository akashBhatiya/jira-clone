import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as Types from '../Types'
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
          if (firebaseUser) {
            setUser(firebaseUser);
          } else {
            setUser(null);
          }
          setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
      } catch (err) {
        setError('Failed to authenticate');
        console.error(err);
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError('Failed to logout');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
