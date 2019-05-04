import REQUEST from '../constants/request-constants';
import EXCEPTIONS from '../../constants/exceptions';

module.exports = (req, res, next) => {
	if (req.isAuthenticated()) {
		res.send();
	} else {
		res.status(401).send(EXCEPTIONS.notLoggedIn);
	}
};