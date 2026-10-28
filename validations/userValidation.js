import { z } from 'zod';

export const signupValidation = z
  .object({
    name: z.string().trim().min(1, 'Name is required'),

    email: z
      .string()
      .trim()
      .email('Please provide a valid email')
      .transform((email) => email.toLowerCase()),

    password: z.string().min(8, 'Password must be at least 8 characters'),

    passwordConfirm: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords are not the same',
    path: ['passwordConfirm'],
  });

export const loginValidation = z.object({
  email: z
    .string()
    .trim()
    .email('Please provide a valid email')
    .transform((email) => email.toLowerCase()),

  password: z.string().min(1, 'Password is required'),
});

export const updateUserValidation = z
  .object({
    name: z.string().trim().min(1, 'Name is required').optional(),

    email: z
      .string()
      .trim()
      .email('Please provide a valid email')
      .transform((email) => email.toLowerCase())
      .optional(),

    photo: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export const forgotPasswordValidation = z.object({
  email: z
    .string()
    .trim()
    .email('Please provide a valid email')
    .transform((email) => email.toLowerCase()),
});

export const resetPasswordValidation = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),

    passwordConfirm: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords are not the same',
    path: ['passwordConfirm'],
  });

export const updatePasswordValidation = z
  .object({
    passwordCurrent: z.string().min(1, 'Current password is required'),

    password: z.string().min(8, 'Password must be at least 8 characters'),

    passwordConfirm: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords are not the same',
    path: ['passwordConfirm'],
  });
