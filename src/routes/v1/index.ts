import { Router } from 'express';

// Import feature-specific routes
import { authRoutes, roleRoutes, userRoutes } from '../../modules/index.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { checkPermission } from '../../middlewares/rbac.middleware.js';

const router = Router();

// Base routes
router.use('/auth', authRoutes);
router.use('/user', authMiddleware, checkPermission('*'), userRoutes);
router.use('/role', authMiddleware, checkPermission('*'), roleRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is healthy ✅' });
});

export default router;
