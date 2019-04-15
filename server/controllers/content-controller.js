import ContentBLI from "../classes/bli/content";
import REQUEST from "../constants/request-constants";

module.exports = (req, res, next) => {
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
  }
};
