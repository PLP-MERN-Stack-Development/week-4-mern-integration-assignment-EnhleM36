import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import {
  registerValidationRules,
  loginValidationRules,
  validate,
} from '../utils/validation.js';

const router = express.Router();

router.route('/').post(registerValidationRules(), validate, registerUser);
router.route('/login').post(loginValidationRules(), validate, authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;