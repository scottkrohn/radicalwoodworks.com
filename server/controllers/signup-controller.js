import passport from "passport";

// Constants
import REQUEST from '../constants/request-constants';

module.exports = (req, res, next) => {
	console.log(passport);
	if (req.method === REQUEST.method.post) {
		console.log('doing passport stuff');

		passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : false // allow flash messages
		})(req, res, next);
	}
}