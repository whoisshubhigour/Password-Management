import express from 'express';
import {
  createPassword,
  getPasswords,
  deletePassword,
} from '../controllers/passwordController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createPassword)
  .get(protect, getPasswords);
router.route('/:id').delete(protect, deletePassword);

export default router;