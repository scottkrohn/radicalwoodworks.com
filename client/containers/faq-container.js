import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';

// Actions
import { getAllContent } from 'client/actions/content-actions';

// Selectors
import { getAllContent as getAllContentObjects } from 'client/selectors/content-selector';

class FaqContainer extends Component {
    constructor(props) {
        super(props);
    }

	componentDidMount = () => {
		this.props.getAllContent('POLICY');
    }

	renderContent = () => {
		return (
			<div>
				{this.props.content.map((contentElement) => {
					return (<div key={uniqueId()}>
						<div dangerouslySetInnerHTML={{ __html: contentElement.getContent() }}></div>
					</div>);
				})}
			</div>
		);
	}

    render = () => {
        return (
             <div>
                 {this.renderContent()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
		content: getAllContentObjects(state),
	};
};

const mapActionsToProps = {
    getAllContent: getAllContent
};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(FaqContainer);
