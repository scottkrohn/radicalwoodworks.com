const EXCEPTIONS = {
  default: {
    code: -1,
    message: 'An unknown error occurred',
  },
  invalidCredentials: {
    code: 1000,
    message: 'Invalid username or password',
  },
  noUserFound: {
    code: 1001,
    message: 'No user found',
  },
  internalError: {
    code: 1002,
    message: 'Internal server error',
  },
  unauthorized: {
    code: 1003,
    message: "You're not logged in",
  },
  routeNotFound: {
    code: 1004,
    message: 'Invalid Route',
  },
  notFound: {
    code: 1005,
    message: 'Not Found',
  },
  productNotFound: {
    code: 1006,
    message: 'Product Not Found',
  },
  cartNotFound: {
    code: 1007,
    message: 'Cart not found',
  },
};

EXCEPTIONS.apiError = (error, status = 500) => {
  return {
    ...error,
    status,
  };
};

EXCEPTIONS.getMessageForErrorCode = (code) => {
  for (const prop in EXCEPTIONS) {
    const error = EXCEPTIONS[prop];
    if (error.code === code) {
      return error.message;
    }
  }

  return EXCEPTIONS.default.message;
};

export default EXCEPTIONS;
