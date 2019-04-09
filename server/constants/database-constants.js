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
				etsyUrl: 'etsy_url',
			},
		},
		images: {
			name: 'images',
			columns: {
				id: 'id',
				thumbUrl: 'thumb_url',
				mainUrl: 'main_url',
			},
		},
		productImageMap: {
			name: 'product_image_map',
			columns: {
				productId: 'product_id',
				imageId: 'image_id',
				hidden: 'hidden',
				isPrimary: 'is_primary',
			},
		},
	},
};

export default DATABASE;
