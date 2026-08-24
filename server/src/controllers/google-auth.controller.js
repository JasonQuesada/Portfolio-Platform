import { createAuthorizationUrl } from '../services/google-drive.service.js';

const startGoogleAuthorization = (req, res) => {
  const authorizationUrl = createAuthorizationUrl();

  res.redirect(authorizationUrl);
};

export { startGoogleAuthorization };