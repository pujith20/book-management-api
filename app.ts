import express from 'express';
import bookRoutes from './routes/bookRoutes';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import { PORT } from './config/environment';

const app = express();

app.use(express.json());
app.use(logger);
app.use('/api', bookRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
