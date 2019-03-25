import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

// Actions
import { getSampleInformation } from '../actions/sample-actions';

class HomepageContainer extends Component {
	componentDidMount = () => {
		this.props.getSampleInformation();
	};

	render = () => {
		const repos = get(this.props, 'sample.info', []);

		return (
			<div>
				<h3>I am the homepage container.</h3>
				<h5>Here are Scott Krohn's github repos:</h5>
				<table>
					<thead>
						<tr>
							<th>Repo Name</th>
						</tr>
					</thead>
					<tbody>
						{repos.length > 0 &&
							repos.map((repoInfo, index) => {
								return <tr key={index}>{repoInfo.name}</tr>;
							})}
					</tbody>
				</table>
			</div>
		);
	};
}

const mapStateToProps = (state) => state;

const mapActionsToProps = {
	getSampleInformation,
};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(HomepageContainer);
