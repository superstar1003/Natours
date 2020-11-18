const Tour = require('../models/tourModels');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModels');

exports.getOverview = catchAsync(async (req, res, next) => {
  //1.) Get tour data from the collection
  //2.) Build Template
  //3.) Render that template using tour data from 1)
  const tours = await Tour.find();
  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  //-1)Create the route for tour detail page acc to the URL tha u just built before

  //-2) get the data ,  for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    field: 'review rating user',
  });

  //-3) Build the template
  //-4) Render the template using the data from 1)
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('tour', {
      title: `${tour.name} Tour`,
      tour,
    });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: `Log into your account`,
  });
};
