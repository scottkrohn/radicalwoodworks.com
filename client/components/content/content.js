import React, { PureComponent } from 'react';

import 'client/components/content/content.less';

class Content extends PureComponent {
	constructor(props) {
		super(props);
	}

	render = () => {
		return (
			<div className="content-container">
				<div dangerouslySetInnerHTML={{ __html: this.props.content }} />
			</div>
		);
	}
}

export default Content;