import upload from '../lib/image-upload';

import ImagesBLI from '../classes/bli/images';
import AuthHelper from '@helpers/auth-helper';

import REQUEST from '../constants/request-constants';
import EXCEPTIONS from '../../constants/exceptions';

const singleUpload = upload.single('image');

export default (req, res, next) => {
  if (!AuthHelper.isAuthenticatedAdmin(req)) {
    res.status(403).send(EXCEPTIONS.unauthorized);
    return;
  }

  const productId = req.params.productId;
  const imagesBli = new ImagesBLI();

  if (req.method === REQUEST.method.post) {
    singleUpload(req, res, (err) => {
      if (err) {
        res.status(500).send();
        return;
      }

      imagesBli
        .createImageWithMapping(req.file.location, false, productId)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.status(500).send(error);
        });

      return;
    });
  }
};
