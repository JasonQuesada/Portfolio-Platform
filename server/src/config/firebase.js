import { cert, getApps, initializeApp } from 'firebase-admin/app';

import env from './env.js';

const firebaseApp =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId: env.firebase.projectId,
          clientEmail: env.firebase.clientEmail,
          privateKey: env.firebase.privateKey.replace(/\\n/g, '\n'),
        }),
      });

export default firebaseApp;