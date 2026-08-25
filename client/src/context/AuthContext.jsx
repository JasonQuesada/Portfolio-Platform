import { createContext, useContext, useEffect, useState } from 'react';

import {
  getCurrentUser,
  signInWithGoogle,
  signOutUser,
  subscribeToAuthState,
} from '../services/auth.service.js';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async () => {
    return signInWithGoogle();
  };

  const signOut = async () => {
    await signOutUser();
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };