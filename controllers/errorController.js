const AppError = require('../utils/appError');

const handleJWTExpiredError = () =>
  new AppError('Your token has expired!! Please login again...', 401);

const handleJWTError = () =>
  new AppError('Invalid token. Please login again', 401);

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  //console.log(errors);
  const message = `Invalid input data: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldDB = (err) => {
  const message = `Duplicate field value : '${err.keyValue.name}' please use another value!`;
  return new AppError(message, 400);
};

const handleCasteErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  //Operational :  trusted error send message to client
  if (err.Operational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  //Programming or other unknown error : don't leak error details
  else {
    //1.) log Error
    console.error('ERROR', err);

    //2.) Send generic message

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong .',
    });
  }
};

module.exports = (err, req, res, next) => {
  //console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.assign(err);
    // console.log('ERROR:'error);
    //console.log('error.name:', error.name);
    if (error.name === 'CastError') error = handleCasteErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldDB(error);

    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
