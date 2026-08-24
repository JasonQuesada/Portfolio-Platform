import { google } from 'googleapis';

import env from '../config/env.js';
import {
  getGoogleDriveCredentials,
} from './google-drive-credentials.service.js';

const GOOGLE_DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';

const createOAuthClient = () =>
  new google.auth.OAuth2(
    env.google.clientId,
    env.google.clientSecret,
    env.google.redirectUri,
  );

const createAuthorizationUrl = () => {
  const oauthClient = createOAuthClient();

  return oauthClient.generateAuthUrl({
    access_type: 'offline',
    scope: [GOOGLE_DRIVE_SCOPE],
    prompt: 'consent',
  });
};

const exchangeAuthorizationCode = async (code) => {
  const oauthClient = createOAuthClient();
  const { tokens } = await oauthClient.getToken(code);

  return tokens;
};

const createAuthenticatedDriveClient = async () => {
  const credentials = await getGoogleDriveCredentials();

  if (!credentials?.refreshToken) {
    throw new Error('Google Drive authorization is not configured');
  }

  const oauthClient = createOAuthClient();

  oauthClient.setCredentials({
    refresh_token: credentials.refreshToken,
  });

  return google.drive({
    version: 'v3',
    auth: oauthClient,
  });
};

export {
  createOAuthClient,
  createAuthorizationUrl,
  exchangeAuthorizationCode,
  createAuthenticatedDriveClient,
};