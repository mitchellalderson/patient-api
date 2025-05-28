import { errorHandler } from './middleware/errorHandler';
import logger from 'morgan'
import express from 'express';
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(logger('dev'));

// Routes
app.use('/api/', routes);
app.use('/', (req, res) => {
        res.status(200).json({status: 'ok'});
});

// Global error handler
app.use(errorHandler);

export default app;