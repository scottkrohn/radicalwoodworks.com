import { get } from 'lodash';

// Classes
import ImagesBLI from '../classes/bli/images';

// Constants
import REQUEST from '../constants/request-constants';
import EXCEPTIONS from '../../constants/exceptions';

export default (req, res, next) => {
  const imagesBli = new ImagesBLI();

  if (req.method === REQUEST.method.delete) {
    const imageId = req.params.imageId;

    imagesBli.deleteImage(imageId)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } else if (req.method === REQUEST.method.put) {
    const imageId = req.params.imageId;
    const isPrimary = get(req, 'body.isPrimary', null);
    const hidden = get(req, 'body.hidden', null);
    const productId = get(req, 'body.productId', null);

    if (productId) {
      imagesBli.updateProductImageMapping(productId, imageId, isPrimary, hidden)
        .then(() => {
          res.send();
        })
        .catch((error) => {
          res.status(500).send(get(error, 'message'));
        });
    } else {
      res.status(404).send(EXCEPTIONS.notFound);
    }
  }
};
