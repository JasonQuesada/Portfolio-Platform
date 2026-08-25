import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import { AdminAuthProvider } from './context/AdminAuthContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './styles/globals.css';
import './styles/admin.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AdminAuthProvider>
        <App />
      </AdminAuthProvider>
    </AuthProvider>
  </StrictMode>,
);