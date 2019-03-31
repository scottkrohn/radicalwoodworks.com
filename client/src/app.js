import React, { Component } from 'react';

import Router from './router';

// Styles
import './app.less';						// Global app css
import 'antd/dist/antd.less';	// Ant Design app less

class App extends Component {
	render = () => {
		return (
			<div className="app-container">
				<Router />
			</div>
		);
	}
}

export default App;
