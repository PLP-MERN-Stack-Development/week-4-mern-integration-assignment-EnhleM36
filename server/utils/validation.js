import { body, validationResult } from 'express-validator';

// Validation rules for posts
const postValidationRules = () => {
  return [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').notEmpty().withMessage('Category is required'),
  ];
};

// Validation rules for categories
const categoryValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
  ];
};

// Validation rules for user registration
const registerValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ];
};

// Validation rules for user login
const loginValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ];
};

// Validate function
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export {
  postValidationRules,
  categoryValidationRules,
  registerValidationRules,
  loginValidationRules,
  validate,
};