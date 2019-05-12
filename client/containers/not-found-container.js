import React, { Component } from 'react';

// Components
import NavLink from 'client/components/nav/nav-link';

class NotFoundContainer extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 text-center">
                        <h4>Uh oh, you're not supposed to be here. You should probably go back <NavLink label="home" to="/" />.</h4>
                    </div>
                </div>
            </div>
        );
    };
}

export default NotFoundContainer;
