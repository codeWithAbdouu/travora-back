import Review from '../models/reviewModel.js';
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from './handlerFactory.js';
import {
  createReviewValidation,
  updateReviewValidation,
} from '../validations/reviewValidation.js';
// import catchAsync from '../utils/catchAsync.js';

export const setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

export const getAllReviews = getAll(Review);
export const getReview = getOne(Review);
export const createReview = createOne(Review, createReviewValidation);
export const updateReview = updateOne(Review, updateReviewValidation);
export const deleteReview = deleteOne(Review);
