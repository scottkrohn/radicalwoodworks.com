import ProductsBLI from '../classes/bli/products';

module.exports = (req, res, next) => {
	const productsBli = new ProductsBLI();

	productsBli.getProducts()
		.then((result) => {
			res.send(result);
		})
		.catch((error) => {
			//TODO: Do something with the error.
		});
};