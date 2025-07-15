import express from 'express';
import {
  getCategories,
  createCategory,
} from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { categoryValidationRules, validate } from '../utils/validation.js';

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(protect, admin, categoryValidationRules(), validate, createCategory);

export default router;