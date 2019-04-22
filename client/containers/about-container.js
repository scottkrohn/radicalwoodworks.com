import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

// Actions
import { getAllContent } from 'client/actions/content-actions';

// Selectors
import { getAllContent as getAllContentObjects, getLoading } from 'client/selectors/content-selector';

// Components
import AboutUsInfo from 'client/components/about-us/about-us-info';
import { Spin } from 'antd';

class AboutContainer extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		this.props.getAllContent('ABOUT');
	}

	render = () => {
		const content = get(this.props, 'content', null);

		return (
			<div className="container">
				<div className="col-xs-12">
				<Spin spinning={this.props.loading}>
					<div className="text-center">
						<h1>Radical Woodworks</h1>
						{this.props.content && <AboutUsInfo content={content} /> }
					</div>
				</Spin>
				</div>
			</div>
		);
	};
}

const mapStateToProps = (state) => {
	return {
		content: getAllContentObjects(state),
		loading: getLoading(state),
	};
};

const mapActionsToProps = {
	getAllContent: getAllContent,
};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(AboutContainer);
