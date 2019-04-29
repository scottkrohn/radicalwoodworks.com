import passport from "passport";
import ProductsBLI from '../classes/bli/products';

// Constants
import REQUEST from '../constants/request-constants';

module.exports = (req, res, next) => {
	const productsBli = new ProductsBLI();

	console.log('getting products');

	passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : false // allow flash messages
	})(req, res, next);

	if (req.method === REQUEST.method.get) {
		const productId = req.params.productId;
		if (productId) {
			productsBli.getProduct(productId)
				.then((result) => {
					res.send(result);
				})
				.catch((error) => {

				});
		} else {
			productsBli.getProducts()
				.then((result) => {
					res.send(result);
				})
				.catch((error) => {
					//TODO: Do something with the error.
				});
		}
	}
};
