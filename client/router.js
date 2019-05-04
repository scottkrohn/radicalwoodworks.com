import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Cookie from 'js-cookie';
import PropTypes from 'prop-types';

// Containers
import HomepageContainer from 'containers/homepage-container';
import ProductsContainer from 'containers/products-container';
import AboutContainer from 'containers/about-container';
import ContactContainer from 'containers/contact-container';
import ProductContainer from 'containers/product-container';
import FaqContainer from 'containers/faq-container';
import AdminContainer from 'containers/admin-container';
import LoginContainer from 'containers/login-container';

const Router = () => (
	<Switch>

		<Route exact path='/' component={HomepageContainer}/>
		<Route exact path='/about' component={AboutContainer}/>
		<Route exact path='/contact' component={ContactContainer}/>
		<Route exact path='/faq' component={FaqContainer}/>
		<Route exact path='/login' component={LoginContainer}/>
		<Route exact path='/products' component={ProductsContainer}/>
		<Route exact path='/products/product/:productId' component={ProductContainer}/>

		{/* Protected Routes */}
		<ProtectedRoute exact path='/admin' component={AdminContainer}/>
	</Switch>
);

const ProtectedRoute = ({component: Component, ...args}) => {
	return (
		<Route {...args} render={(props) => {
			const isLoggedIn = !!Cookie.get('utoken');
			return (isLoggedIn ? <Component {...props} /> : <Redirect to='/login' />);
		}} />
	);
};

ProtectedRoute.propTypes = {
	component: PropTypes.func,
};

export default Router;