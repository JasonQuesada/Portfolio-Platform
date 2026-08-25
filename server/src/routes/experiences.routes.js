import { Router } from 'express';

import {
  createExperienceController,
  deleteExperienceController,
  getExperienceController,
  getPublishedExperiencesController,
  updateExperienceController,
} from '../controllers/experiences.controller.js';

import authenticateAdmin from '../middleware/admin-auth.middleware.js';
import authorizeAdmin from '../middleware/authorize-admin.middleware.js';

const router = Router();

const adminMiddleware = [
  authenticateAdmin,
  authorizeAdmin,
];

router.get('/', getPublishedExperiencesController);

router.get('/:id', getExperienceController);

router.post(
  '/',
  ...adminMiddleware,
  createExperienceController,
);

router.put(
  '/:id',
  ...adminMiddleware,
  updateExperienceController,
);

router.delete(
  '/:id',
  ...adminMiddleware,
  deleteExperienceController,
);

export default router;