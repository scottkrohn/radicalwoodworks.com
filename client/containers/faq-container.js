import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';

// Actions
import { getAllContent } from 'client/actions/content-actions';

// Selectors
import { getAllContent as getAllContentObjects } from 'client/selectors/content-selector';

// Components
import Content from 'client/components/content/content';

class FaqContainer extends Component {
    constructor(props) {
        super(props);
    }

	componentDidMount = () => {
	    this.props.getAllContent('POLICY');
	};

	render = () => {
	    return (
	        <div className="container">
	            <div className="row">
	                <div className="col-12">
	                    <div className="text-center">
	                        <h1>Radical Woodworks Products</h1>
	                    </div>
	                    {this.props.content.map((contentElement) => {
	                        return (
	                            <div key={uniqueId()}>
	                                <Content content={contentElement.getContent()} />
	                            </div>
	                        );
	                    })}
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
)(FaqContainer);
