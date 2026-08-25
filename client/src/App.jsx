import { BrowserRouter, Route, Routes } from 'react-router-dom';

import appConfig from '@/config/app.config';
import AdminRoute from '@/routes/AdminRoute';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminPage from '@/pages/admin/AdminPage';

function HomePage() {
  return (
    <main>
      <h1>{appConfig.name}</h1>
      <p>Project initialized successfully.</p>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;