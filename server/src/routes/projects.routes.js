import { Router } from 'express';

import {
  createProjectController,
  deleteProjectController,
  getProjectController,
  getPublishedProjectsController,
  updateProjectController,
} from '../controllers/projects.controller.js';

import authenticateAdmin from '../middleware/admin-auth.middleware.js';
import authorizeAdmin from '../middleware/authorize-admin.middleware.js';

const router = Router();

const adminMiddleware = [
  authenticateAdmin,
  authorizeAdmin,
];

router.get('/', getPublishedProjectsController);

router.get('/:id', getProjectController);

router.post(
  '/',
  ...adminMiddleware,
  createProjectController,
);

router.put(
  '/:id',
  ...adminMiddleware,
  updateProjectController,
);

router.delete(
  '/:id',
  ...adminMiddleware,
  deleteProjectController,
);

export default router;