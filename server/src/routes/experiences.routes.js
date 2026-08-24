import { Router } from 'express';

import {
  createExperienceController,
  deleteExperienceController,
  getExperienceController,
  getPublishedExperiencesController,
  updateExperienceController,
} from '../controllers/experiences.controller.js';

const router = Router();

router.get('/', getPublishedExperiencesController);
router.get('/:id', getExperienceController);

router.post('/', createExperienceController);
router.put('/:id', updateExperienceController);
router.delete('/:id', deleteExperienceController);

export default router;