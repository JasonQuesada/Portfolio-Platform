import { getAuth } from 'firebase-admin/auth';

const authenticateAdmin = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({
        message: 'Authentication required',
      });
    }

    const [scheme, token] = authorizationHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({
        message: 'Invalid authorization header',
      });
    }

    const decodedToken = await getAuth().verifyIdToken(token);

    req.user = decodedToken;

    return next();
  } catch (error) {
    console.error('Admin authentication error:', error);

    return res.status(401).json({
      message: 'Invalid or expired authentication token',
    });
  }
};

export default authenticateAdmin;