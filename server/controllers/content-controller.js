import ContentBLI from '../classes/bli/content';
import REQUEST from '../constants/request-constants';

module.exports = (req, res, next) => {
    const contentBli = new ContentBLI();
    console.log('in content controller');
    console.log(req.method);
    if (req.method === REQUEST.method.get) {
        console.log('making get req');
        const contentType = req.params.contentType;
        console.log(contentType);

        if(contentType) {
            contentBli.getAllContent(contentType)
                .then((result) => {
                    console.log(result);
                    res.send(result);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
}

