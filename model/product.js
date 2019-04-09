import Model from './model';

class Product extends Model {
	constructor() {
		super();

		this.data = {
			id: null,
			type: null,
			title: null,
			description: null,
			cost: null,
			price: null,
			shipping_price: null,
			include_shipping_in_price: null,
			etsy_url: null,
		};

		this.children = {
			images: null,
		};
	}

	setId = (id) => {
		this.id = id;
	};
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
	setShippingPrice = (shipping_price) => {
		this.data.shipping_price = shipping_price;
	};
	setIncludeShippingInPrice = (include_shipping_in_price) => {
		this.data.include_shipping_in_price = include_shipping_in_price;
	};
	setEtsyUrl = (etsy_url) => {
		this.data.etsy_url = etsy_url;
	}

	getId = () => {
		return this.data.id;
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
		return this.data.shipping_price;
	};
	getIncludeShippingInPrice = () => {
		return this.data.include_shipping_in_price;
	};
	getEtsyUrl = () => {
		return this.data.etsy_url;
	}

	/* Children Getters & Setters */
	/******************************/
	setImages = (images) => {
		this.children.images = images;
	}

	getImages = () => {
		return this.children.images;
	}
}

export default Product;
