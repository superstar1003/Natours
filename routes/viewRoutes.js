const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();

const viewController = require('../controllers/viewController');

router.use(authController.isLoggedIn);

router.get('/', viewController.getOverview);
router.get(`/tour/:slug`, viewController.getTour);

router.get('/login', viewController.getLoginForm);

module.exports = router;

// create a login route

// create a controller

// template
