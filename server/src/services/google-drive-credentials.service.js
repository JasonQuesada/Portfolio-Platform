import { getFirestore } from 'firebase-admin/firestore';

const GOOGLE_DRIVE_CREDENTIALS_DOCUMENT = 'integrations/google-drive';

const getCredentialsDocument = () => {
  const db = getFirestore();

  return db.doc(GOOGLE_DRIVE_CREDENTIALS_DOCUMENT);
};

const saveGoogleDriveCredentials = async (tokens) => {
  const document = getCredentialsDocument();

  await document.set(
    {
      refreshToken: tokens.refresh_token,
      scope: tokens.scope,
      tokenType: tokens.token_type,
      updatedAt: new Date(),
    },
    { merge: true },
  );
};

const getGoogleDriveCredentials = async () => {
  const document = getCredentialsDocument();
  const snapshot = await document.get();

  if (!snapshot.exists) {
    return null;
  }

  return snapshot.data();
};

export {
  saveGoogleDriveCredentials,
  getGoogleDriveCredentials,
};