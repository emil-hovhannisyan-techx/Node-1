// Custom Error Classes ( because why not )

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
  }
}

class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(message = "Invalid request data") {
    super(message, 400);
  }
}

class MethodNotAllowedError extends AppError {
  constructor(message = "Method not allowed") {
    super(message, 405);
  }
}

module.exports = {
  AppError,
  NotFoundError,
  ValidationError,
  MethodNotAllowedError,
};
