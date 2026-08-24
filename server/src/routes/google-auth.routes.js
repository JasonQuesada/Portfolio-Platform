import { Router } from 'express';

import {
  startGoogleAuthorization,
} from '../controllers/google-auth.controller.js';

const router = Router();

router.get('/google', startGoogleAuthorization);

export default router;