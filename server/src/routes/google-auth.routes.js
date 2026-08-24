import { Router } from 'express';

import {
  startGoogleAuthorization,
  handleGoogleCallback,
} from '../controllers/google-auth.controller.js';

const router = Router();

router.get('/google', startGoogleAuthorization);
router.get('/google/callback', handleGoogleCallback);

export default router;