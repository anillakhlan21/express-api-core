import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorMiddleware } from './middlewares/error.middleware.js';
import routes from './routes/index.js';
import { swaggerSpec, swaggerUi } from './config/swagger.js';
import helmet from 'helmet';
dotenv.config();

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'trusted.cdn.com'],
      },
    },
    crossOriginEmbedderPolicy: false, // example: disable one header if it breaks something
  })
);
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
