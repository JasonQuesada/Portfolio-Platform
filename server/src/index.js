import express from 'express';

import './config/firebase.js';
import env from './config/env.js';
import healthRoutes from './routes/health.routes.js';

const app = express();

app.use(express.json());

app.use('/api/health', healthRoutes);

app.listen(env.port, () => {
  console.log(`Portfolio Platform server running on port ${env.port}`);
});