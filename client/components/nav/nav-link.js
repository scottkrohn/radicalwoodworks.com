import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class NavLink extends PureComponent {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(this.props.name);
    }
  };

  render = () => {
    return (
      <Link
        className={this.props.className}
        onClick={this.handleClick}
        to={this.props.to}
      >
        {this.props.label}
        {this.props.children}
      </Link>
    );
  };
}

NavLink.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default NavLink;
