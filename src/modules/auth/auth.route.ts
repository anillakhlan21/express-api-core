import express from 'express';
import { loginSchema, registerSchema } from './auth.schema.js';
import validateMiddleware from '../../middlewares/validate.middleware.js';
import { AuthController } from './auth.controller.js';

const router = express.Router();

router.post('/register', validateMiddleware(registerSchema), AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', validateMiddleware(loginSchema), AuthController.login);
router.get('/me', AuthController.getProfile);

export default router;
