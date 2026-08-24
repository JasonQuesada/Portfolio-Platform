import { Router } from 'express';

import {
  createProjectController,
  deleteProjectController,
  getProjectController,
  getPublishedProjectsController,
  updateProjectController,
} from '../controllers/projects.controller.js';

const router = Router();

router.get('/', getPublishedProjectsController);
router.get('/:id', getProjectController);

router.post('/', createProjectController);
router.put('/:id', updateProjectController);
router.delete('/:id', deleteProjectController);

export default router;