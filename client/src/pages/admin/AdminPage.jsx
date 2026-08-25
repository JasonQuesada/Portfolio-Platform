import { useAuth } from '@/context/AuthContext';
import { useAdminAuth } from '@/context/AdminAuthContext';

function AdminPage() {
  const {
    loading: authLoading,
    isAuthenticated,
    signIn,
    signOut,
  } = useAuth();

  const {
    admin,
    loading: authorizationLoading,
    error: authorizationError,
    isAdmin,
  } = useAdminAuth();

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

  if (!isAdmin) {
    return (
      <main>
        <h1>Access denied</h1>
        <p>
          {authorizationError ??
            'You are not authorized to access the admin panel.'}
        </p>

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
        Signed in as <strong>{admin.email}</strong>
      </p>

      <button type="button" onClick={signOut}>
        Sign out
      </button>
    </main>
  );
}

export default AdminPage;