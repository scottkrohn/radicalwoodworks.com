import CartItem from '@model/cart-item';

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
    admin_users: {
      name: 'admin_users',
      columns: {
        id: 'id',
        username: 'username',
        password: 'password',
      },
    },
    carts: {
      name: 'carts',
      columns: {
        id: 'id',
        createdTs: 'created_ts',
        updatedTs: 'updated_ts',
        expirationTs: 'updated_ts',
        customerId: 'customer_id',
        isExpired: 'is_expired',
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
    [cartColumns.customerId]: cart.getCustomerId(),
    [cartColumns.isExpired]: cart.getIsExpired(),
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
  };
};
export default DATABASE;
