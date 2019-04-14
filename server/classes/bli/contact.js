import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

class ContactBLI {

    constructor() {
    }

    sendEmail = (contact) => {

        const mailOptions = {
            from: contact.getFrom(),
            to: contact.getTo(),
            html: contact.getHtml(),
            subject: contact.getSubject(),
        };

        // TODO: Return a promise from sending mail
        const transporter = this._getTransporter();
        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
    }

    _getTransporter = () => {

        const configPath = path.join(__dirname, '../../../config/config.yaml');
        const config = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));

        const transportOptions = {
            host: config.emailHost,
            auth: {
                user: config.emailUser,
                pass: config.emailPassword,
            },
        };

        const transporter = nodemailer.createTransport(transportOptions);
        return transporter;
    }
}

export default ContactBLI;