const EXCEPTIONS = {
	default: {
		code: -1,
		message: 'An unknown error occurred'
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