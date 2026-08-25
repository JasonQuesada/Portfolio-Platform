import { NavLink } from 'react-router-dom';

function AdminNavItem({
  label,
  to,
  icon,
  disabled = false,
  onNavigate,
}) {
  if (disabled) {
    return (
      <span
        className="admin-nav-item admin-nav-item--disabled"
        aria-disabled="true"
      >
        <span className="admin-nav-item__icon" aria-hidden="true">
          {icon}
        </span>

        <span className="admin-nav-item__label">{label}</span>
        <span className="admin-nav-item__badge">Soon</span>
      </span>
    );
  }

  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `admin-nav-item${isActive ? ' admin-nav-item--active' : ''}`
      }
      onClick={onNavigate}
    >
      <span className="admin-nav-item__icon" aria-hidden="true">
        {icon}
      </span>

      <span className="admin-nav-item__label">{label}</span>
    </NavLink>
  );
}

export default AdminNavItem;