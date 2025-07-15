import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { postValidationRules, validate } from '../utils/validation.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, admin, postValidationRules(), validate, createPost);

router.route('/:id')
  .get(getPostById)
  .put(protect, admin, postValidationRules(), validate, updatePost)
  .delete(protect, admin, deletePost);

export default router;