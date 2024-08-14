import { Router } from 'express';
import loginLimiter from '../middleware/login-limiter.js';
import { loginUser, refreshAccessToken, logoutUser } from '../controllers/auth.controller.js';

const router = Router();

router.post('/', loginLimiter, loginUser);
router.get('/', refreshAccessToken);
router.post('/logout', logoutUser);

export default router;
