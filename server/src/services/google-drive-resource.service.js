import {
  createExperienceFolder,
  createProjectFolder,
} from './google-drive-folders.service.js';

const getExperienceDriveFolder = async (experience) => {
  if (!experience?.name) {
    throw new Error('Experience name is required');
  }

  return createExperienceFolder(experience.name);
};

const getProjectDriveFolder = async (project) => {
  if (!project?.name) {
    throw new Error('Project name is required');
  }

  return createProjectFolder(project.name);
};

export {
  getExperienceDriveFolder,
  getProjectDriveFolder,
};