import { createAuthenticatedDriveClient } from './google-drive.service.js';

const uploadFile = async ({
  fileName,
  mimeType,
  fileContent,
  parentFolderId,
}) => {
  const drive = await createAuthenticatedDriveClient();

  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [parentFolderId],
    },
    media: {
      mimeType,
      body: fileContent,
    },
    fields: 'id, name, mimeType, webViewLink, webContentLink',
  });

  return response.data;
};

export {
  uploadFile,
};