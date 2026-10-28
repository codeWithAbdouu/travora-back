import { z } from 'zod';

export const createReviewValidation = z.object({
  review: z.string().trim().min(1, 'Review cannot be empty'),

  rating: z
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5')
    .optional(),

  tour: z.string().min(1, 'Review must belong to a tour').optional(),

  user: z.string().min(1, 'Review must belong to a user').optional(),
});

export const updateReviewValidation = z
  .object({
    review: z.string().trim().min(1, 'Review cannot be empty').optional(),

    rating: z
      .number()
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating cannot exceed 5')
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });
