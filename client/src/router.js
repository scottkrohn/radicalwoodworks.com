import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import HomepageContainer from '../src/containers/homepage-container';

const Router = () => (
	<Switch>
		<Route exact path='/' component={HomepageContainer}/>
	</Switch>
);

export default Router;