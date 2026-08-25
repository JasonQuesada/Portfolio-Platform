import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import app from '../config/firebase.config.js';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);

  return result.user;
};

const signOutUser = async () => {
  await signOut(auth);
};

const subscribeToAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

const getCurrentUser = () => auth.currentUser;

export {
  signInWithGoogle,
  signOutUser,
  subscribeToAuthState,
  getCurrentUser,
};