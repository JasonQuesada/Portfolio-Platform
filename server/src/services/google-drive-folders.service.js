import {
  createAuthenticatedDriveClient,
} from './google-drive.service.js';

const findFolder = async (drive, name, parentId = null) => {
  const queryParts = [
    "mimeType = 'application/vnd.google-apps.folder'",
    `name = '${name.replace(/'/g, "\\'")}'`,
    'trashed = false',
  ];

  if (parentId) {
    queryParts.push(`'${parentId}' in parents`);
  }

  const response = await drive.files.list({
    q: queryParts.join(' and '),
    fields: 'files(id, name)',
    spaces: 'drive',
  });

  return response.data.files[0] || null;
};

const createFolder = async (drive, name, parentId = null) => {
  const response = await drive.files.create({
    requestBody: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      ...(parentId && {
        parents: [parentId],
      }),
    },
    fields: 'id, name',
  });

  return response.data;
};

const findOrCreateFolder = async (drive, name, parentId = null) => {
  const existingFolder = await findFolder(drive, name, parentId);

  if (existingFolder) {
    return existingFolder;
  }

  return createFolder(drive, name, parentId);
};

const initializeGoogleDriveFolders = async () => {
  const drive = await createAuthenticatedDriveClient();

  const rootFolder = await findOrCreateFolder(
    drive,
    'Portfolio Platform',
  );

  const profilePictureFolder = await findOrCreateFolder(
    drive,
    'Profile Picture',
    rootFolder.id,
  );

  const cvFolder = await findOrCreateFolder(
    drive,
    'CV',
    rootFolder.id,
  );

  const experiencesFolder = await findOrCreateFolder(
    drive,
    'Experiences',
    rootFolder.id,
  );

  const projectsFolder = await findOrCreateFolder(
    drive,
    'Projects',
    rootFolder.id,
  );

  return {
    rootId: rootFolder.id,
    profilePictureId: profilePictureFolder.id,
    cvId: cvFolder.id,
    experiencesId: experiencesFolder.id,
    projectsId: projectsFolder.id,
  };
};

const createExperienceFolder = async (experienceName) => {
  const drive = await createAuthenticatedDriveClient();

  const folders = await initializeGoogleDriveFolders();

  return findOrCreateFolder(
    drive,
    experienceName,
    folders.experiencesId,
  );
};

const createProjectFolder = async (projectName) => {
  const drive = await createAuthenticatedDriveClient();

  const folders = await initializeGoogleDriveFolders();

  return findOrCreateFolder(
    drive,
    projectName,
    folders.projectsId,
  );
};

export {
  initializeGoogleDriveFolders,
  createExperienceFolder,
  createProjectFolder,
};