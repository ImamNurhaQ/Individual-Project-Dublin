function errorHandlerMiddleware(error, req, res, next) {
  let status;
  let message;

  if (error.name === 'SequelizeValidationError') {
    status = 400;
    message = error.errors[0].message;
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    status = 400;
    message = error.errors[0].message;
  } else if (error.name === 'Forbidden') {
    status = 403;
    message = 'forbidden';
  } else if (error.name === 'telahTerbooking') {
    status = 403;
    message = 'sorry you added before';
  } else if (error.name === 'NotFound') {
    status = 404;
    message = 'not found';
  } else if (error.name === 'MissingAccsesToken') {
    status = 401;
    message = 'missing acces token';
  } else if (error.name === 'Unauthorized') {
    status = 401;
    message = 'Email not register';
  } else if (error.name === 'InvalidPassword') {
    status = 401;
    message = 'password not matched';
  } else {
    status = 500;
    message = 'internal server error';
  }
  res.status(status).json({ message });

}

module.exports = errorHandlerMiddleware;