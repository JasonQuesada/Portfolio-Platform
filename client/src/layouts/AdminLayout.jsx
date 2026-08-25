import { useEffect, useState } from 'react';

import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';

function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle(
      'admin-sidebar-open',
      isSidebarOpen,
    );

    return () => {
      document.body.classList.remove('admin-sidebar-open');
    };
  }, [isSidebarOpen]);

  return (
    <div className="admin-layout">
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {isSidebarOpen && (
        <button
          className="admin-layout__overlay"
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="admin-layout__content">
        <AdminHeader
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="admin-layout__main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;