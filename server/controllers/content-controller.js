import EXCEPTIONS from '../../constants/exceptions';
import ContentBLI from '../classes/bli/content';
import REQUEST from '../constants/request-constants';
import Content from '../../model/content';
import AuthHelper from '@helpers/auth-helper';

export default (req, res, next) => {
  const contentBli = new ContentBLI();

  if (req.method === REQUEST.method.get) {
    const contentType = req.params.contentType;

    if (contentType) {
      contentBli
        .getAllContent(contentType)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {});
    }
  } else if (req.method === REQUEST.method.put) {
    if (!AuthHelper.isAuthenticatedAdmin(req)) {
      res.status(403).send(EXCEPTIONS.unauthorized);
      return;
    }

    const content = new Content();
    content.setValues(req.body);

    contentBli
      .updateContent(content)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
};
