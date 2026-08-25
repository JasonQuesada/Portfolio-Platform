import { getFirestore } from 'firebase-admin/firestore';

const AUTHORIZED_ADMINS_COLLECTION = 'authorizedAdmins';

const getAuthorizedAdminsCollection = () => {
  const db = getFirestore();

  return db.collection(AUTHORIZED_ADMINS_COLLECTION);
};

const isAuthorizedAdmin = async (uid) => {
  if (!uid) {
    return false;
  }

  const document = await getAuthorizedAdminsCollection()
    .doc(uid)
    .get();

  return document.exists && document.data()?.active === true;
};

export {
  isAuthorizedAdmin,
};