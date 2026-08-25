import { useAuth } from '@/context/AuthContext';

function AdminPage() {
  const {
    user,
    loading,
    isAuthenticated,
    signIn,
    signOut,
  } = useAuth();

  if (loading) {
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

  return (
    <main>
      <h1>Admin</h1>

      <p>
        Signed in as <strong>{user.email}</strong>
      </p>

      <button type="button" onClick={signOut}>
        Sign out
      </button>
    </main>
  );
}

export default AdminPage;