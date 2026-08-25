import { Navigate } from 'react-router-dom';

import { useAuth } from '@/context/AuthContext';
import { useAdminAuth } from '@/context/AdminAuthContext';

function AdminRoute({ children }) {
  const {
    loading: authLoading,
    isAuthenticated,
  } = useAuth();

  const {
    admin,
    loading: authorizationLoading,
    error: authorizationError,
  } = useAdminAuth();

  const authorizationPending =
    isAuthenticated &&
    !admin &&
    !authorizationError;

  if (
    authLoading ||
    authorizationLoading ||
    authorizationPending
  ) {
    return <p>Verifying administrator access...</p>;
  }

  if (!isAuthenticated || !admin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default AdminRoute;