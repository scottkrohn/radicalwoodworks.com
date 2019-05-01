import passport from 'passport';
import REQUEST from '../constants/request-constants';
import EXCEPTIONS from '../../constants/exceptions';
import jwt from 'jsonwebtoken';
import { getConfig } from '../../lib/protected';

module.exports = (req, res, next) => {
	if (req.method === REQUEST.method.post) {
		passport.authenticate('local-login', {}, (err, user, info) => {
			if (err) {
				res.status(500).send(EXCEPTIONS.internalError);
				return;
			} else if (!user) {
				res.status(401).send(info);
				return;
			}

			// Successful login, let's send the user back to the front end.
			const token = jwt.sign(user, getConfig('jwtSecret'));
			res.send({token});
		})(req, res, next);
	}
};
