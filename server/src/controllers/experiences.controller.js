import {
  createExperience,
  deleteExperience,
  getExperienceById,
  getPublishedExperiences,
  updateExperience,
} from '../services/experiences.service.js';

const createExperienceController = async (req, res) => {
  try {
    const experience = await createExperience(req.body);

    res.status(201).json({
      message: 'Experience created successfully',
      experience,
    });
  } catch (error) {
    console.error('Error creating experience:', error);

    res.status(500).json({
      message: 'Failed to create experience',
    });
  }
};

const getExperienceController = async (req, res) => {
  try {
    const experience = await getExperienceById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        message: 'Experience not found',
      });
    }

    return res.json({
      experience,
    });
  } catch (error) {
    console.error('Error getting experience:', error);

    return res.status(500).json({
      message: 'Failed to get experience',
    });
  }
};

const getPublishedExperiencesController = async (req, res) => {
  try {
    const experiences = await getPublishedExperiences();

    res.json({
      experiences,
    });
  } catch (error) {
    console.error('Error getting published experiences:', error);

    res.status(500).json({
      message: 'Failed to get experiences',
    });
  }
};

const updateExperienceController = async (req, res) => {
  try {
    const experience = await updateExperience(
      req.params.id,
      req.body,
    );

    res.json({
      message: 'Experience updated successfully',
      experience,
    });
  } catch (error) {
    console.error('Error updating experience:', error);

    res.status(500).json({
      message: 'Failed to update experience',
    });
  }
};

const deleteExperienceController = async (req, res) => {
  try {
    await deleteExperience(req.params.id);

    res.json({
      message: 'Experience deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting experience:', error);

    res.status(500).json({
      message: 'Failed to delete experience',
    });
  }
};

export {
  createExperienceController,
  getExperienceController,
  getPublishedExperiencesController,
  updateExperienceController,
  deleteExperienceController,
};