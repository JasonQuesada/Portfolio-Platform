import {
  FieldValue,
  getFirestore,
} from 'firebase-admin/firestore';

import {
  createExperienceFolder,
} from './google-drive-folders.service.js';

const EXPERIENCES_COLLECTION = 'experiences';

const getExperiencesCollection = () => {
  const db = getFirestore();

  return db.collection(EXPERIENCES_COLLECTION);
};

const createExperience = async (experienceData) => {
  const collection = getExperiencesCollection();

  const document = collection.doc();

  const driveFolder = await createExperienceFolder(
    experienceData.title,
  );

  const now = FieldValue.serverTimestamp();

  await document.set({
    ...experienceData,
    driveFolderId: driveFolder.id,
    createdAt: now,
    updatedAt: now,
  });

  return {
    id: document.id,
    driveFolderId: driveFolder.id,
  };
};

const getExperienceById = async (experienceId) => {
  if (!experienceId) {
    throw new Error('Experience ID is required');
  }

  const collection = getExperiencesCollection();
  const document = await collection.doc(experienceId).get();

  if (!document.exists) {
    return null;
  }

  return {
    id: document.id,
    ...document.data(),
  };
};

const getPublishedExperiences = async () => {
  const collection = getExperiencesCollection();

  const snapshot = await collection
    .where('published', '==', true)
    .orderBy('order')
    .get();

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

const updateExperience = async (experienceId, experienceData) => {
  if (!experienceId) {
    throw new Error('Experience ID is required');
  }

  const collection = getExperiencesCollection();

  const document = collection.doc(experienceId);

  await document.update({
    ...experienceData,
    updatedAt: FieldValue.serverTimestamp(),
  });

  return getExperienceById(experienceId);
};

const deleteExperience = async (experienceId) => {
  if (!experienceId) {
    throw new Error('Experience ID is required');
  }

  const collection = getExperiencesCollection();

  await collection.doc(experienceId).delete();
};

export {
  createExperience,
  getExperienceById,
  getPublishedExperiences,
  updateExperience,
  deleteExperience,
};