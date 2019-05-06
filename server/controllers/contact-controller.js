import ContactBLI from '../classes/bli/contact';
import REQUEST from '../constants/request-constants';
import Contact from '../../model/contact';

module.exports = (req, res, next) => {
    const contactBli = new ContactBLI();

    if (req.method === REQUEST.method.post) {
        const body = req.body;

        const contact = new Contact();
        contact.setValues(body.contact);
        contactBli.sendEmail(contact).then((info, err) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).send(info);
            }
        });
    }
};
