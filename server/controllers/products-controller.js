import ProductsBLI from '@bli/products';

// Constants
import REQUEST from '@constants-server/request-constants';

export default (req, res, next) => {
  const productsBli = new ProductsBLI();

  if (req.method === REQUEST.method.get) {
    const productId = req.params.productId;
    if (productId) {
      productsBli
        .getProduct(productId)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {});
    } else {
      productsBli
        .getProducts()
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }
  }
};
