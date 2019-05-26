import ImagesBLI from '../classes/bli/images';

// Constants
import REQUEST from '../constants/request-constants';
import EXCEPTIONS from '../../constants/exceptions';

module.exports = (req, res, next) => {
  const imagesBli = new ImagesBLI();

  if (req.method === REQUEST.method.delete) {
    const imageId = req.params.imageId;

    imagesBli.deleteImage(imageId)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(EXCEPTIONS.internalError).send(error);
      });
  }
};
