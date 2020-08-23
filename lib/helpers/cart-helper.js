class CartHelper {
  calculateCartTotals = (cart) => {
    let cartValues = {
      lineItemTotals: [],
      itemTotal: 0,
      shippingTotal: 0,
      taxTotal: 0,
    };

    if (!cart || !cart.getItems) {
      return cartValues;
    }

    return cart.getItems().reduce(
      (totals, item) => {
        const itemPrice = item.getProduct().getPrice() * item.getQuantity();
        const shippingPrice =
          item.getProduct().getShippingPrice() * item.getQuantity();

        const lineItemTotal = {
          label: item.getProduct().getTitle(),
          quantity: item.getQuantity(),
          price: itemPrice,
          productId: item.getProduct().getId(),
        };

        return {
          itemTotal: (totals.itemTotal += itemPrice),
          shippingTotal: (totals.shippingTotal += shippingPrice),
          lineItemTotals: [...totals.lineItemTotals, lineItemTotal],
          taxTotal: 0,
        };
      },
      {
        ...cartValues,
      }
    );
  };
}

export default CartHelper;
