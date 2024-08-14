import { z } from 'zod';

// Zod validation schema
export const createUserValidation = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    mobile: z
      .string()
      .regex(/^\d{10}$/, 'Invalid mobile number'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    role: z.enum(['user', 'shopOwner']),
    gender: z.enum(['male', 'female']),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    },
  );
