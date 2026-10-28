import AppError from './appError.js';

const validate = (schema, data, next) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => issue.message)
      .join(', ');

    return next(new AppError(message, 400));
  }

  return result.data;
};

export default validate;
