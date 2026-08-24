import {
  createAuthorizationUrl,
  exchangeAuthorizationCode,
} from '../services/google-drive.service.js';

import {
  saveGoogleDriveCredentials,
  saveGoogleDriveFolders,
} from '../services/google-drive-credentials.service.js';

import {
  initializeGoogleDriveFolders,
} from '../services/google-drive-folders.service.js';

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

const initializeGoogleDrive = async (req, res) => {
  const folders = await initializeGoogleDriveFolders();

  await saveGoogleDriveFolders(folders);

  res.json({
    message: 'Google Drive folders initialized successfully',
    folders,
  });
};

export {
  startGoogleAuthorization,
  handleGoogleCallback,
  initializeGoogleDrive,
};