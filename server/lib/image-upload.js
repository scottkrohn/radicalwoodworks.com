import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { getConfig } from '../../lib/protected';

const awsConfig = {
    secretAccessKey: getConfig('awsSecretKey'),
    accessKeyId: getConfig('awsAccessKeyId'),
    region: getConfig('awsRegion'),
};

console.log(awsConfig);

aws.config.update(awsConfig);



const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: 'radicalwoodworks-images',
        metadata: (req, file, callback) => {
            callback(null, {fieldName: file.fieldname});
        },
        key: (req, file, callback) => {
            callback(null, file.originalname+Date.now().toString());
        },
    }),
});

module.exports = upload;