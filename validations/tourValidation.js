import { z } from 'zod';

const locationSchema = z.object({
  type: z.literal('Point').optional(),

  coordinates: z
    .array(z.number())
    .length(2, 'Coordinates must contain longitude and latitude')
    .optional(),

  address: z.string().optional(),

  description: z.string().optional(),

  day: z.number().int().positive().optional(),
});

export const createTourValidation = z
  .object({
    name: z
      .string()
      .trim()
      .min(10, 'Tour name must be at least 10 characters')
      .max(40, 'Tour name cannot exceed 40 characters'),

    duration: z.number().positive('Duration must be greater than 0'),

    maxGroupSize: z
      .number()
      .int()
      .positive('Group size must be greater than 0'),

    difficulty: z.enum(['easy', 'medium', 'difficult']),

    price: z.number().nonnegative('Price cannot be negative'),

    priceDiscount: z
      .number()
      .nonnegative('Discount price cannot be negative')
      .optional(),

    summary: z.string().trim().min(1, 'Tour summary is required'),

    description: z.string().optional(),

    imageCover: z.string().trim().min(1, 'Cover image is required'),

    images: z.array(z.string()).optional(),

    startDates: z.array(z.coerce.date()).optional(),

    secretTour: z.boolean().optional(),

    startLocation: locationSchema.optional(),

    locations: z.array(locationSchema).optional(),

    guides: z.array(z.string().min(1, 'Guide ID is required')).optional(),
  })
  .refine(
    (data) =>
      data.priceDiscount === undefined || data.priceDiscount < data.price,
    {
      message: 'Discount price must be below regular price',
      path: ['priceDiscount'],
    },
  );

export const updateTourValidation = createTourValidation
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  })
  .refine(
    (data) =>
      data.priceDiscount === undefined ||
      data.price === undefined ||
      data.priceDiscount < data.price,
    {
      message: 'Discount price must be below regular price',
      path: ['priceDiscount'],
    },
  );
