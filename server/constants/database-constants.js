const DATABASE = {
	tables: {
		products: {
			name: 'products',
			columns: {
				id: 'id',
				type: 'type',
				title: 'title',
				description: 'description',
				cost: 'cost',
				price: 'price',
				shippingPrice: 'shipping_price',
				includeShippingInPrice: 'include_shipping_in_price',
			}
		}
	}
};

export default DATABASE;
