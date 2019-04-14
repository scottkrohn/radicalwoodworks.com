import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Containers
import HomepageContainer from 'containers/homepage-container';
import ProductsContainer from 'containers/products-container';
import AboutContainer from 'containers/about-container';
import ContactContainer from 'containers/contact-container';
import ProductContainer from 'containers/product-container';
import FaqContainer from 'containers/faq-container';


const Router = () => (
	<Switch>

		<Route exact path='/' component={HomepageContainer}/>
		<Route exact path='/about' component={AboutContainer}/>
		<Route exact path='/contact' component={ContactContainer}/>
		<Route exact path='/faq' component={FaqContainer}/>

		// Product Pages
		<Route exact path='/products' component={ProductsContainer}/>
		<Route exact path='/products/product/:productId' component={ProductContainer}/>
	</Switch>
);

export default Router;