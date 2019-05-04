import React, { Component } from 'react';

import { connect } from 'react-redux';

export const withValidation = (WrappedComponent) => {
	return class Validation extends Component {
		constructor(props) {
			super(props);
		}

		redirectToHome = () => {
			window.location = '/';
		}

		render = () => {
			const functions = {
				redirectToHome: this.redirectToHome,
			};

			return <WrappedComponent {...this.props} {...functions} />;
		}
	};
};
