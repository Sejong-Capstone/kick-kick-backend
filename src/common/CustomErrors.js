class CustomError extends Error {
  constructor(message, ...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }

    this.message = message
  }
}

class BadRequestError extends CustomError {
  constructor(message) {
    super(message);

    this.status_code = 400;
  }
}

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);

    this.status_code = 401;
  }
}

class ForbiddenError extends CustomError {
  constructor(message) {
    super(message);

    this.status_code = 403;
  }
}

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);

    this.status_code = 404;
  }
}

class MethodNotAllowedError extends CustomError {
  constructor(message) {
    super(message);

    this.status_code = 405;
  }
}

class ConflictError extends CustomError {
  constructor(message) {
    super(message);

    this.status_code = 409;
  }
}

class TooManyRequestsError extends CustomError {
  constructor(message) {
    super(message);

    this.status_code = 429;
  }
}

class ErrorMessages {
}

module.exports = {
  CustomError, 
  BadRequestError,
  UnauthorizedError, 
  ForbiddenError,
  NotFoundError,
  MethodNotAllowedError,
  ConflictError,
  TooManyRequestsError,

  ErrorMessages
}