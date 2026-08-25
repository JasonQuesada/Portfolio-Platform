import appConfig from '@/config/app.config';

import AdminNavItem from './AdminNavItem';

const navigationItems = [
  {
    label: 'Dashboard',
    to: '/admin/dashboard',
    icon: '�',
  },
  {
    label: 'Projects',
    icon: '?',
    disabled: true,
  },
  {
    label: 'Experience',
    icon: '?',
    disabled: true,
  },
  {
    label: 'Skills',
    icon: '?',
    disabled: true,
  },
  {
    label: 'Profile',
    icon: '?',
    disabled: true,
  },
  {
    label: 'Resume',
    icon: '?',
    disabled: true,
  },
  {
    label: 'Messages',
    icon: '?',
    disabled: true,
  },
];

function AdminSidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`admin-sidebar${isOpen ? ' admin-sidebar--open' : ''}`}
      aria-label="Administration navigation"
    >
      <div className="admin-sidebar__brand">
        <div
          className="admin-sidebar__brand-mark"
          aria-hidden="true"
        >
          P
        </div>

        <div className="admin-sidebar__brand-copy">
          <span className="admin-sidebar__brand-name">
            {appConfig.name}
          </span>

          <span className="admin-sidebar__brand-label">
            Administration
          </span>
        </div>

        <button
          className="admin-sidebar__close"
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
        >
          �
        </button>
      </div>

      <nav className="admin-sidebar__navigation">
        <span className="admin-sidebar__section-label">
          Workspace
        </span>

        <div className="admin-sidebar__items">
          {navigationItems.map((item) => (
            <AdminNavItem
              key={item.label}
              {...item}
              onNavigate={onClose}
            />
          ))}
        </div>

        <span className="admin-sidebar__section-label">
          System
        </span>

        <div className="admin-sidebar__items">
          <AdminNavItem
            label="Settings"
            icon="?"
            disabled
          />
        </div>
      </nav>

      <div className="admin-sidebar__footer">
        <span className="admin-sidebar__footer-text">
          Portfolio Platform
        </span>

        <span className="admin-sidebar__footer-version">
          Administration
        </span>
      </div>
    </aside>
  );
}

export default AdminSidebar;