import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorMiddleware } from './middlewares/error.middleware';
import routes from './routes';
import { swaggerSpec, swaggerUi } from './config/swagger';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Middleware
app.use(errorMiddleware);

export default app;
