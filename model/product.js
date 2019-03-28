import Model from './model';

class Product extends Model {
	constructor() {
		super();

		this.data = {
			type: null,
			title: null,
			description: null,
			cost: null,
			price: null,
			shippingPrice: null,
			includeShippingInPrice: null,
		};
	}

	setType = (type) => {
		this.data.type = type;
	};
	setTitle = (title) => {
		this.data.title = title;
	};
	setDescription = (description) => {
		this.data.description = description;
	};
	setCost = (cost) => {
		this.data.cost = cost;
	};
	setPrice = (price) => {
		this.data.price = price;
	};
	setShippingPrice = (shippingPrice) => {
		this.data.shippingPrice = shippingPrice;
	};
	setIncludeShippingInPrice = (includeShippingInPrice) => {
		this.data.includeShippingInPrice = includeShippingInPrice;
	};

	getType = () => {
		return this.data.type;
	};
	getTitle = () => {
		return this.data.title;
	};
	getDescription = () => {
		return this.data.description;
	};
	getCost = () => {
		return this.data.cost;
	};
	getPrice = () => {
		return this.data.price;
	};
	getShippingPrice = () => {
		return this.data.shippingPrice;
	};
	getIncludeShippingInPrice = () => {
		return this.data.includeShippingInPrice;
	};
}

export default Product;
