import { Router } from 'express';
import loginLimiter from '../middleware/login-limiter.js';
import { login, logout, refresh } from '../controllers/auth.controller.js';

const router = Router();

router.post('/', loginLimiter, login);
router.get('/', refresh);
router.post('/logout', logout);

export default router;
