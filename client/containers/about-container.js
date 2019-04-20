import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';

// Actions
import { getAllContent } from 'client/actions/content-actions';

// Selectors
import { getAllContent as getAllContentObjects } from 'client/selectors/content-selector';

// Constants
import IMAGE from 'client/constants/image-constants';

class AboutContainer extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		this.props.getAllContent('ABOUT');
	}

	renderContent = () => {
		return (
			<div>
				{this.props.content.map((contentElement) => {
					return (<div key={uniqueId()}>
						<div dangerouslySetInnerHTML={{ __html: contentElement.getContent() }} />
					</div>);
				})}
			</div>
		);
	}

	render = () => {
		return (
			<div className="container">
				<div className="col-xs-12">
					<div className="text-center">
						<h1>Radical Woodworks</h1>
						<img src={IMAGE.getFullUrl(IMAGE.images.aboutUs.family)} height={400} width={400} />
						{this.renderContent()}
					</div>
				</div>
			</div>
		);
	};
}

const mapStateToProps = (state) => {
	return {
		content: getAllContentObjects(state),
	};
};

const mapActionsToProps = {
	getAllContent: getAllContent,
};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(AboutContainer);
