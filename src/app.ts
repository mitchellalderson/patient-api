import express from 'express';
import userRoutes from './routes/users'
import { errorHandler } from './middleware/errorHandler';
import logger from 'morgan'

const app = express();

app.use(express.json());
app.use(logger('dev'));

// Routes
app.use('/api/users', userRoutes);

// Global error handler
app.use(errorHandler);

export default app;