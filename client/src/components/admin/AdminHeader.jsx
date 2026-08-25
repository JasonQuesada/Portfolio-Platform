import { useAdminAuth } from '@/context/AdminAuthContext';
import { useAuth } from '@/context/AuthContext';

function AdminHeader({ onMenuClick }) {
  const { admin } = useAdminAuth();
  const { signOut } = useAuth();

  const displayName =
    admin?.displayName ||
    admin?.email?.split('@')[0] ||
    'Administrator';

  const avatarLabel = displayName.charAt(0).toUpperCase();

  return (
    <header className="admin-header">
      <div className="admin-header__left">
        <button
          className="admin-header__menu"
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <div>
          <p className="admin-header__eyebrow">
            Administration
          </p>

          <h1 className="admin-header__title">
            Dashboard
          </h1>
        </div>
      </div>

      <div className="admin-header__actions">
        <div className="admin-account">
          <div
            className="admin-account__avatar"
            aria-hidden="true"
          >
            {avatarLabel}
          </div>

          <div className="admin-account__details">
            <span className="admin-account__name">
              {displayName}
            </span>

            <span className="admin-account__email">
              {admin?.email}
            </span>
          </div>
        </div>

        <button
          className="admin-header__sign-out"
          type="button"
          onClick={signOut}
        >
          Sign out
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;