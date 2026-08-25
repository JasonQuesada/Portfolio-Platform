import { Router } from 'express';

import {
  getCurrentAdminController,
} from '../controllers/admin-auth.controller.js';

import authenticateAdmin from '../middleware/admin-auth.middleware.js';
import authorizeAdmin from '../middleware/authorize-admin.middleware.js';

const router = Router();

router.get(
  '/me',
  authenticateAdmin,
  authorizeAdmin,
  getCurrentAdminController,
);

export default router;