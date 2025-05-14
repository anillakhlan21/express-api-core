import { Router } from 'express';

// Import feature-specific routes
import {authRoutes, roleRoutes, userRoutes } from '../../modules';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

// Base routes
router.use('/auth', authRoutes);
router.use('/user', authMiddleware,  userRoutes);
router.use('/role', authMiddleware,  roleRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is healthy ✅' });
});

export default router;