import React, { Component } from 'react';

// Components
import { Link } from 'react-router-dom';

const NotFoundContainer = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center">
          <h4 className="mt-5">
            Uh oh, you're not supposed to be here. You should probably go back
            <Link to="/"> home</Link>.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default {
  component: NotFoundContainer,
};
