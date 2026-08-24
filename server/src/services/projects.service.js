import {
  FieldValue,
  getFirestore,
} from 'firebase-admin/firestore';

import {
  createProjectFolder,
} from './google-drive-folders.service.js';

const PROJECTS_COLLECTION = 'projects';

const getProjectsCollection = () => {
  const db = getFirestore();

  return db.collection(PROJECTS_COLLECTION);
};

const createProject = async (projectData) => {
  const collection = getProjectsCollection();

  const document = collection.doc();

  const driveFolder = await createProjectFolder(
    projectData.name,
  );

  const now = FieldValue.serverTimestamp();

  await document.set({
    ...projectData,
    driveFolderId: driveFolder.id,
    createdAt: now,
    updatedAt: now,
  });

  return {
    id: document.id,
    driveFolderId: driveFolder.id,
  };
};

const getProjectById = async (projectId) => {
  if (!projectId) {
    throw new Error('Project ID is required');
  }

  const collection = getProjectsCollection();
  const document = await collection.doc(projectId).get();

  if (!document.exists) {
    return null;
  }

  return {
    id: document.id,
    ...document.data(),
  };
};

const getPublishedProjects = async () => {
  const collection = getProjectsCollection();

  const snapshot = await collection
    .where('published', '==', true)
    .orderBy('order')
    .get();

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

const updateProject = async (projectId, projectData) => {
  if (!projectId) {
    throw new Error('Project ID is required');
  }

  const collection = getProjectsCollection();

  const document = collection.doc(projectId);

  await document.update({
    ...projectData,
    updatedAt: FieldValue.serverTimestamp(),
  });

  return getProjectById(projectId);
};

const deleteProject = async (projectId) => {
  if (!projectId) {
    throw new Error('Project ID is required');
  }

  const collection = getProjectsCollection();

  await collection.doc(projectId).delete();
};

export {
  createProject,
  getProjectById,
  getPublishedProjects,
  updateProject,
  deleteProject,
};