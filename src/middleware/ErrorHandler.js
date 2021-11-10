const CustomError = require('./CustomError');

const ErrorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.code).json(err)
  }
  
  return res.status(500).json(err)
}

module.exports = ErrorHandler;