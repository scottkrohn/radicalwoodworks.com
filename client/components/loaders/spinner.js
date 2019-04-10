import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'

// Components
import { Spin } from 'antd';

// Styles
import 'client/components/loaders/spinner.less';

class Spinner extends PureComponent {
	constructor(props) {
		super(props);
	}

	render = () => {
		return (
			<div className="spinner-container">
				<div className="spinner">
					<Spin
						spinning={this.props.loading}
						delay={this.props.delay}
						size={this.props.size}
						tip={this.props.tip}
					>
						{this.props.children}
					</Spin>
				</div>
			</div>
		);
	}
}

Spinner.propTypes = {
	loading: PropTypes.bool,
	delay: PropTypes.number,
	size: PropTypes.string,
	tip: PropTypes.string,
}

export default Spinner;