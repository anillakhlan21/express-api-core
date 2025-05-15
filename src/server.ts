import app from './app.js';
import mongoose from 'mongoose';
import { AppLogger } from './utils/logger.util.js';

const logger = new AppLogger('AuthService');

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, async () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('DB connection failed:', err);
    process.exit(1);
  });

process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);
