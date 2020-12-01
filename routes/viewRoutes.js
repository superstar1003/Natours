const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(viewController.alerts);

const viewController = require('../controllers/viewController');
//const bookingController = require('../controllers/bookingController');

router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get(`/tour/:slug`, authController.isLoggedIn, viewController.getTour);

router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/me', authController.protect, viewController.getAccount);

router.get(
  '/my-tours',
  //bookingController.createBookingCheckout,
  authController.protect,
  viewController.getMyTours
);

router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
);
module.exports = router;
