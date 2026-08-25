import { useEffect, useState } from 'react';

import { useAuth } from '@/context/AuthContext';
import { getCurrentAdmin } from '@/services/admin-auth.service';

function AdminPage() {
  const {
    user,
    loading: authLoading,
    isAuthenticated,
    signIn,
    signOut,
  } = useAuth();

  const [admin, setAdmin] = useState(null);
  const [authorizationLoading, setAuthorizationLoading] = useState(false);
  const [authorizationError, setAuthorizationError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setAdmin(null);
      setAuthorizationError(null);
      return;
    }

    let active = true;

    const verifyAdminAccess = async () => {
      setAuthorizationLoading(true);
      setAuthorizationError(null);

      try {
        const result = await getCurrentAdmin();

        if (!active) {
          return;
        }

        if (!result) {
          setAuthorizationError('You are not authorized to access the admin panel.');
          setAdmin(null);
          return;
        }

        setAdmin(result);
      } catch {
        if (!active) {
          return;
        }

        setAuthorizationError(
          'Unable to verify administrator access.',
        );
        setAdmin(null);
      } finally {
        if (active) {
          setAuthorizationLoading(false);
        }
      }
    };

    verifyAdminAccess();

    return () => {
      active = false;
    };
  }, [isAuthenticated]);

  if (authLoading) {
    return <p>Checking authentication...</p>;
  }

  if (!isAuthenticated) {
    return (
      <main>
        <h1>Admin</h1>
        <p>Sign in to access the administration panel.</p>

        <button type="button" onClick={signIn}>
          Continue with Google
        </button>
      </main>
    );
  }

  if (authorizationLoading) {
    return (
      <main>
        <h1>Admin</h1>
        <p>Verifying administrator access...</p>
      </main>
    );
  }

  if (authorizationError) {
    return (
      <main>
        <h1>Access denied</h1>
        <p>{authorizationError}</p>

        <button type="button" onClick={signOut}>
          Sign out
        </button>
      </main>
    );
  }

  return (
    <main>
      <h1>Admin</h1>

      <p>
        Signed in as <strong>{admin.user.email}</strong>
      </p>

      <button type="button" onClick={signOut}>
        Sign out
      </button>
    </main>
  );
}

export default AdminPage;