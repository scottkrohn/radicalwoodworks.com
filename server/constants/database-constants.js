import CartItem from '@models/cart-item';

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
        defaultColor: 'default_color',
        width: 'width',
        length: 'length',
        frameWidth: 'frame_width',
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
    content: {
      name: 'content',
      columns: {
        id: 'id',
        type: 'type',
        category: 'category',
        content: 'content',
        createdTs: 'created_ts',
        updatedTs: 'updated_ts',
      },
    },
    users: {
      name: 'users',
      columns: {
        id: 'id',
        username: 'username',
        password: 'password',
        type: 'type',
        email: 'email',
        firstName: 'first_name',
        lastName: 'last_name',
      },
    },
    carts: {
      name: 'carts',
      columns: {
        id: 'id',
        createdTs: 'created_ts',
        updatedTs: 'updated_ts',
        expirationTs: 'expiration_ts',
        userId: 'user_id',
        isExpired: 'is_expired',
        sid: 'sid',
      },
    },
    cartItems: {
      name: 'cart_items',
      columns: {
        id: 'id',
        cartId: 'cart_id',
        productId: 'product_id',
        quantity: 'quantity',
        isDeleted: 'is_deleted',
        notes: 'notes',
      },
    },
    orders: {
      name: 'orders',
      columns: {
        id: 'id',
        createdTs: 'created_ts',
        updatedTs: 'updated_ts',
        userId: 'user_id',
        promoCode: 'promo_code',
        promoDiscount: 'promo_discount',
        subtotal: 'subtotal',
        shippingTotal: 'shipping_total',
        taxTotal: 'tax_total',
        grandTotal: 'grand_total',
        cartId: 'cart_id',
        status: 'status',
        fulfillmentStatus: 'fulfillment_status',
        addressId: 'address_id',
        trackingNumber: 'tracking_number',
        trackingProvider: 'tracking_provider',
        sid: 'sid',
      },
    },
    orderItems: {
      name: 'order_items',
      columns: {
        id: 'id',
        shippingPrice: 'shipping_price',
        itemPrice: 'item_price',
        productId: 'product_id',
        quantity: 'quantity',
        notes: 'notes',
        orderId: 'order_id',
      },
    },
    addresses: {
      name: 'addresses',
      columns: {
        id: 'id',
        type: 'type',
        firstName: 'first_name',
        lastName: 'last_name',
        address: 'address',
        aptSuite: 'apt_suite',
        zip: 'zip',
        city: 'city',
        state: 'state',
        email: 'email',
        userId: 'user_id',
      },
    },
  },
};

DATABASE.getProductDatabaseFieldsMapping = (product) => {
  const productColumns = DATABASE.tables.products.columns;

  return {
    [productColumns.id]: product.getId(),
    [productColumns.type]: product.getType(),
    [productColumns.title]: product.getTitle(),
    [productColumns.description]: product.getDescription(),
    [productColumns.cost]: product.getCost(),
    [productColumns.price]: product.getPrice(),
    [productColumns.shippingPrice]: product.getShippingPrice(),
    [productColumns.includeShippingInPrice]: product.getIncludeShippingInPrice(),
    [productColumns.etsyUrl]: product.getEtsyUrl(),
    [productColumns.defaultColor]: product.getDefaultColor(),
    [productColumns.width]: product.getWidth(),
    [productColumns.length]: product.getLength(),
    [productColumns.frameWidth]: product.getFrameWidth(),
  };
};

/**
 * @param {Cart} cart
 */
DATABASE.getCartDatabaseFieldsMapping = (cart) => {
  const cartColumns = DATABASE.tables.carts.columns;

  return {
    [cartColumns.id]: cart.getId(),
    [cartColumns.createdTs]: cart.getCreatedTs(),
    [cartColumns.updatedTs]: cart.getUpdatedTs(),
    [cartColumns.expirationTs]: cart.getExpirationTs(),
    [cartColumns.userId]: cart.getUserId(),
    [cartColumns.isExpired]: cart.getIsExpired(),
    [cartColumns.sid]: cart.getSid(),
  };
};

DATABASE.getCartItemDatabaseFieldsMapping = (cartItem) => {
  const cartItemColumns = DATABASE.tables.cartItems.columns;

  return {
    [cartItemColumns.id]: cartItem.getId(),
    [cartItemColumns.cartId]: cartItem.getCartId(),
    [cartItemColumns.productId]: cartItem.getProductId(),
    [cartItemColumns.quantity]: cartItem.getQuantity(),
    [cartItemColumns.isDeleted]: cartItem.getIsDeleted(),
    [cartItemColumns.notes]: cartItem.getNotes(),
  };
};

DATABASE.getOrderDatabaseFieldsMapping = (order) => {
  const orderColumns = DATABASE.tables.orders.columns;

  return {
    [orderColumns.id]: order.getId(),
    [orderColumns.createdTs]: order.getCreatedTs(),
    [orderColumns.updatedTs]: order.getUpdatedTs(),
    [orderColumns.userId]: order.getUserId(),
    [orderColumns.promoCode]: order.getPromoCode(),
    [orderColumns.promoDiscount]: order.getPromoDiscount(),
    [orderColumns.subtotal]: order.getSubtotal(),
    [orderColumns.shippingTotal]: order.getShippingTotal(),
    [orderColumns.taxTotal]: order.getTaxTotal(),
    [orderColumns.grandTotal]: order.getGrandTotal(),
    [orderColumns.cartId]: order.getCartId(),
    [orderColumns.status]: order.getStatus(),
    [orderColumns.fulfillmentStatus]: order.getFulfillmentStatus(),
    [orderColumns.addressId]: order.getAddressId(),
    [orderColumns.trackingNumber]: order.getTrackingNumber(),
    [orderColumns.trackingProvider]: order.getTrackingProvider(),
    [orderColumns.sid]: order.getSid(),
  };
};

DATABASE.getOrderItemDatabaseFieldsMapping = (orderItem) => {
  const orderItemColumns = DATABASE.tables.orderItems.columns;
  return {
    [orderItemColumns.id]: orderItem.getId(),
    [orderItemColumns.shippingPrice]: orderItem.getShippingPrice(),
    [orderItemColumns.itemPrice]: orderItem.getItemPrice(),
    [orderItemColumns.quantity]: orderItem.getQuantity(),
    [orderItemColumns.notes]: orderItem.getNotes(),
    [orderItemColumns.productId]: orderItem.getProductId(),
    [orderItemColumns.orderId]: orderItem.getOrderId(),
  };
};

DATABASE.getAddressDatabaseFieldsMapping = (customer) => {
  const addressColumns = DATABASE.tables.addresses.columns;

  return {
    [addressColumns.id]: customer.getId(),
    [addressColumns.type]: customer.getType(),
    [addressColumns.firstName]: customer.getFirstName(),
    [addressColumns.lastName]: customer.getLastName(),
    [addressColumns.address]: customer.getAddress(),
    [addressColumns.aptSuite]: customer.getAptSuite(),
    [addressColumns.zip]: customer.getZip(),
    [addressColumns.city]: customer.getCity(),
    [addressColumns.state]: customer.getState(),
    [addressColumns.email]: customer.getEmail(),
    [addressColumns.userId]: customer.getUserId(),
  };
};

export default DATABASE;
