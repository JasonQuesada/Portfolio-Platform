import {
  createAuthenticatedDriveClient,
} from './google-drive.service.js';

const getDriveFileMetadata = async (fileId) => {
  if (!fileId) {
    throw new Error('Google Drive file ID is required');
  }

  const drive = await createAuthenticatedDriveClient();

  const response = await drive.files.get({
    fileId,
    fields: 'id, name, mimeType, size, webViewLink, webContentLink, parents',
  });

  return response.data;
};

const createDriveFileReference = (file) => {
  if (!file?.id) {
    throw new Error('Google Drive file ID is required');
  }

  return {
    fileId: file.id,
    fileName: file.name ?? null,
    mimeType: file.mimeType ?? null,
    size: file.size ? Number(file.size) : null,
    webViewLink: file.webViewLink ?? null,
    webContentLink: file.webContentLink ?? null,
  };
};

export {
  getDriveFileMetadata,
  createDriveFileReference,
};