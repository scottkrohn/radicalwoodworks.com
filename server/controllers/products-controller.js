import ProductsBLI from '../classes/bli/products';

// Constants
import REQUEST from '../constants/request-constants';

module.exports = (req, res, next) => {
	const productsBli = new ProductsBLI();

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
