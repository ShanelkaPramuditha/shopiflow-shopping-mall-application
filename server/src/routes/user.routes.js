import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import verifyJwt from '../middleware/verify-jwt.js';

const router = Router();

router.post('/register', UserController.register);
router.get('/profile', verifyJwt, UserController.profile);

export default router;
