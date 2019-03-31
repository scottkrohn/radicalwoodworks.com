import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import HomepageContainer from 'containers/homepage-container';
import ProductsContainer from 'containers/products-container';
import AboutContainer from 'containers/about-container';
import ContactContainer from 'containers/contact-container';

const Router = () => (
	<Switch>
		<Route exact path='/' component={HomepageContainer}/>
		<Route exact path='/products' component={ProductsContainer}/>
		<Route exact path='/about' component={AboutContainer}/>
		<Route exact path='/contact' component={ContactContainer}/>
	</Switch>
);

export default Router;