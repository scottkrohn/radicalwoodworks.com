import React, { Component } from 'react';

import Router from './router';

// Styles
import './app.css';

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
