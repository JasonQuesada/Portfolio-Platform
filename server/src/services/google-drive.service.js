import { google } from 'googleapis';

import env from '../config/env.js';

const GOOGLE_DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';

const createOAuthClient = () =>
  new google.auth.OAuth2(
    env.google.clientId,
    env.google.clientSecret,
  );

const createAuthorizationUrl = () => {
  const oauthClient = createOAuthClient();

  return oauthClient.generateAuthUrl({
    access_type: 'offline',
    scope: [GOOGLE_DRIVE_SCOPE],
    prompt: 'consent',
  });
};

export {
  createOAuthClient,
  createAuthorizationUrl,
};