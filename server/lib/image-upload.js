import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { getConfig } from '../../lib/protected';

const allowedImageTypes = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/gif',
];

const awsConfig = {
    secretAccessKey: getConfig('awsSecretKey'),
    accessKeyId: getConfig('awsAccessKeyId'),
    region: getConfig('awsRegion'),
};

aws.config.update(awsConfig);

const s3 = new aws.S3();

const fileFilter = (req, file, callback) => {
    const typeAllowed = allowedImageTypes.includes(file.mimetype);
    const error = !typeAllowed ? new Error('Invalid file type.') : null;
    callback(error, typeAllowed);
};

const upload = multer({
    fileFilter,
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: 'radicalwoodworks-images',
        metadata: (req, file, callback) => {
            callback(null, {fieldName: file.fieldname});
        },
        key: (req, file, callback) => {

            callback(null, file.originalname);
        },
    }),
});

module.exports = upload;