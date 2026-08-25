import { isAuthorizedAdmin } from '../services/admin-auth.service.js';

const authorizeAdmin = async (req, res, next) => {
  try {
    if (!req.user?.uid) {
      return res.status(401).json({
        message: 'Authentication required',
      });
    }

    const authorized = await isAuthorizedAdmin(req.user.uid);

    if (!authorized) {
      return res.status(403).json({
        message: 'Administrator access required',
      });
    }

    return next();
  } catch (error) {
    console.error('Admin authorization error:', error);

    return res.status(500).json({
      message: 'Failed to verify administrator authorization',
    });
  }
};

export default authorizeAdmin;