const EXCEPTIONS = {
	invalidPassword: {
		code: 1000,
		message: 'Invalid password',
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

export default EXCEPTIONS;