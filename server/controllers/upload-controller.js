import EXCEPTIONS from '../../constants/exceptions';
const upload = require('../lib/image-upload');

import REQUEST from '../constants/request-constants';

const singleUpload = upload.single('image');

module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(403).send(EXCEPTIONS.unauthorized);
        return;
    };

    if (req.method === REQUEST.method.post) {
        singleUpload(req, res, (err) => {
            if (err) {
                res.status(500).send();
                return;
            }

            res.send({imageUrl: req.file.location});
            return;
        });
    }
};
