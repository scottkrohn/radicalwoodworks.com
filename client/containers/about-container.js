import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';

// Actions
import { getAllContent } from 'client/actions/content-actions';

// Selectors
import { getAllContent as getAllContentObjects } from 'client/selectors/content-selector';

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
						{contentElement.getContent()}
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
						<h3>About Us Under Construction</h3>
						<p>
							<a href="https://www.etsy.com/shop/radicalwoodworks">Visit Our Etsy Shop</a>
						</p>
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
