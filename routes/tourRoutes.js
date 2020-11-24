const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');
// const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.use(`/:tourId/reviews`, reviewRouter);

//router.param('id', tourController.checkId);

// app.get(`/api/v1/tours/:id/:x/:y`, (req, res) => {
// app.get(`/api/v1/tours/:id/:x/:y?`, (req, res) => {             //y is optional

//app.get(`/api/v1/tours`, getAllTours);
//app.get(`/api/v1/tours/:id`,getTour);
//app.post(`/api/v1/tours`, createTour);
//app.patch(`/api/v1/tours/:id`, updateTour );
//app.delete(`/api/v1/tours/:id`, deleteTour);

router.route(`/tour-stats`).get(tourController.getTourStats);
router
  .route(`/top-5-cheap`)
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route(`/monthly-plan/:year`)
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

router
  .route(`/tours-within/:distance/center/:latlng/unit/:unit`)
  .get(tourController.getToursWithin);
router.route(`/distances/:latlng/unit/:unit`).get(tourController.getDistance);
router
  .route(`/`)
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );
router
  .route(`/:id`)
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );
// router
//   .route(`/:tourId/reviews`)
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );
module.exports = router;
