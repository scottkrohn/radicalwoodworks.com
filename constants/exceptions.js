const EXCEPTIONS = {
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
	for (const exception in EXCEPTIONS) {
		console.log(exception);
	}
};

export default EXCEPTIONS;