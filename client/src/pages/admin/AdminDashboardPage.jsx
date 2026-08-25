import { useAuth } from '@/context/AuthContext';

function AdminDashboardPage() {
  const { signOut } = useAuth();

  return (
    <main>
      <h1>Admin Dashboard</h1>

      <p>Administrator access verified successfully.</p>

      <button type="button" onClick={signOut}>
        Sign out
      </button>
    </main>
  );
}

export default AdminDashboardPage;
