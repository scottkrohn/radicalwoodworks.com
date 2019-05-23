import React, { Component } from 'react';
import Cookie from 'js-cookie';

export const withValidation = WrappedComponent => {
  return class Validation extends Component {
    constructor(props) {
      super(props);
    }

        redirectToHome = () => {
          Cookie.remove('utoken');
          window.location = '/';
        };

        render = () => {
          const functions = {
            redirectToHome: this.redirectToHome,
          };

          return <WrappedComponent {...this.props} {...functions} />;
        };
  };
};
