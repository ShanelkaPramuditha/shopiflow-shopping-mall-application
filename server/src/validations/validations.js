import { loginUserValidation } from './auth-validation.js';
import { createUserValidation } from './user-validation.js';
import { createProductValidation } from './product-validation.js';
import {
  createPromotionType1Validation,
  createPromotionType2Validation
} from './promotion-validation.js';

export const schemas = {
  // User Validation Schema
  createUser: createUserValidation,

  // Auth Validation Schema
  loginUser: loginUserValidation,

  // Product Validation Schema
  createProduct: createProductValidation,

  // promotion validation schema
  createPromotionType1: createPromotionType1Validation,
  createPromotionType2: createPromotionType2Validation
};
