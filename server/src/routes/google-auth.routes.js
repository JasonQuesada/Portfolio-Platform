import { Router } from 'express';

import {
  startGoogleAuthorization,
  handleGoogleCallback,
  initializeGoogleDrive,
} from '../controllers/google-auth.controller.js';

const router = Router();

router.get('/google', startGoogleAuthorization);
router.get('/google/callback', handleGoogleCallback);
router.post('/google/initialize', initializeGoogleDrive);

export default router;