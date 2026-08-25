import { createContext, useContext, useEffect, useState } from 'react';

import { useAuth } from './AuthContext';
import { getCurrentAdmin } from '@/services/admin-auth.service';

const AdminAuthContext = createContext(null);

const AdminAuthProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setAdmin(null);
      setError(null);
      setLoading(false);
      return;
    }

    let active = true;

    const verifyAdminAccess = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getCurrentAdmin();

        if (!active) {
          return;
        }

        if (!result?.user) {
          setAdmin(null);
          setError('You are not authorized to access the admin panel.');
          return;
        }

        setAdmin(result.user);
      } catch {
        if (!active) {
          return;
        }

        setAdmin(null);
        setError('Unable to verify administrator access.');
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    verifyAdminAccess();

    return () => {
      active = false;
    };
  }, [isAuthenticated]);

  const value = {
    admin,
    loading,
    error,
    isAdmin: Boolean(admin),
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error(
      'useAdminAuth must be used within an AdminAuthProvider',
    );
  }

  return context;
};

export { AdminAuthProvider, useAdminAuth };