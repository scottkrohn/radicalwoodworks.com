import ProductsBLI from '../classes/bli/products';

module.exports = (req, res, next) => {
	const productsBli = new ProductsBLI();

	productsBli.getProducts((error, result, fields) => {
		if (error) {
			// TODO: Do something with error.	
		} 
		res.json(result);
	});
};