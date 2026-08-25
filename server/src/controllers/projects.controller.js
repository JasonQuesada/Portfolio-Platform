import {
  createProject,
  deleteProject,
  getProjectById,
  getPublishedProjects,
  updateProject,
} from '../services/projects.service.js';

const createProjectController = async (req, res) => {
  try {
    const project = await createProject(req.body);

    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    console.error('Error creating project:', error);

    res.status(500).json({
      message: 'Failed to create project',
    });
  }
};

const getProjectController = async (req, res) => {
  try {
    const project = await getProjectById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: 'Project not found',
      });
    }

    return res.json({
      project,
    });
  } catch (error) {
    console.error('Error getting project:', error);

    return res.status(500).json({
      message: 'Failed to get project',
    });
  }
};

const getPublishedProjectsController = async (req, res) => {
  try {
    const projects = await getPublishedProjects();

    res.json({
      projects,
    });
  } catch (error) {
    console.error('Error getting published projects:', error);

    res.status(500).json({
      message: 'Failed to get projects',
    });
  }
};

const updateProjectController = async (req, res) => {
  try {
    const project = await updateProject(
      req.params.id,
      req.body,
    );

    res.json({
      message: 'Project updated successfully',
      project,
    });
  } catch (error) {
    console.error('Error updating project:', error);

    res.status(500).json({
      message: 'Failed to update project',
    });
  }
};

const deleteProjectController = async (req, res) => {
  try {
    await deleteProject(req.params.id);

    res.json({
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting project:', error);

    res.status(500).json({
      message: 'Failed to delete project',
    });
  }
};

export {
  createProjectController,
  getProjectController,
  getPublishedProjectsController,
  updateProjectController,
  deleteProjectController,
};