import {
  createAuthorizationUrl,
  exchangeAuthorizationCode,
} from '../services/google-drive.service.js';

import {
  saveGoogleDriveCredentials,
} from '../services/google-drive-credentials.service.js';

const startGoogleAuthorization = (req, res) => {
  const authorizationUrl = createAuthorizationUrl();

  res.redirect(authorizationUrl);
};

const handleGoogleCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({
      error: 'Missing authorization code',
    });
  }

  const tokens = await exchangeAuthorizationCode(code);

  await saveGoogleDriveCredentials(tokens);

  res.json({
    message: 'Google Drive authorization successful',
  });
};

export {
  startGoogleAuthorization,
  handleGoogleCallback,
};