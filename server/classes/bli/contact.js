import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

class ContactBLI {
  constructor() {}

  sendEmail = async (contact) => {
    const mailOptions = {
      from: contact.getFrom(),
      to: contact.getTo(),
      html: contact.getHtml(),
      subject: contact.getSubject(),
    };

    const transporter = this._getTransporter();
    return transporter.sendMail(mailOptions);
  };

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
  };
}

export default ContactBLI;
