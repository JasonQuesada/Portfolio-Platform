import { getCurrentUserToken } from './auth.service.js';

const getCurrentAdmin = async () => {
  const token = await getCurrentUserToken();

  if (!token) {
    return null;
  }

  const response = await fetch('/api/admin/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      return null;
    }

    throw new Error('Failed to retrieve admin profile');
  }

  return response.json();
};

export {
  getCurrentAdmin,
};