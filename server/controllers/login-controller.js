import passport from "passport";
import REQUEST from '../constants/request-constants';

module.exports = (req, res, next) => {
	if (req.method === REQUEST.method.post) {
		passport.authenticate('local-login', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : false // allow flash messages
		})(req, res, next);
	}
}