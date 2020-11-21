const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();

const viewController = require('../controllers/viewController');

router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get(`/tour/:slug`, authController.isLoggedIn, viewController.getTour);

router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/me', authController.protect, viewController.getAccount);

module.exports = router;

// create a login route

// create a controller

// template
