import express from 'express';
import { getUsers, createAdmin } from '../controllers/userController';
import { protect, adminOnly } from '../middlewares/authMiddleware';
const router = express.Router();

router.get('/', protect, getUsers);
router.post('/create-admin', protect, adminOnly, createAdmin);

export default router;
