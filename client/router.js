import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import HomepageContainer from 'client/containers/homepage-container';
import AboutContainer from 'client/containers/about-container';

const Router = () => (
	<Switch>
		<Route exact path='/' component={HomepageContainer}/>
		<Route exact path='/about' component={AboutContainer}/>
	</Switch>
);

export default Router;