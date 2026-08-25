import express from 'express';

import './config/firebase.js';
import env from './config/env.js';
import experiencesRoutes from './routes/experiences.routes.js';
import googleAuthRoutes from './routes/google-auth.routes.js';
import healthRoutes from './routes/health.routes.js';
import projectsRoutes from './routes/projects.routes.js';

const app = express();

app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/auth', googleAuthRoutes);
app.use('/api/experiences', experiencesRoutes);
app.use('/api/projects', projectsRoutes);

app.listen(env.port, () => {
  console.log(`Portfolio Platform server running on port ${env.port}`);
});