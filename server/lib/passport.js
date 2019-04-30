import PassportLocal from 'passport-local';
import Database from '../db/db';
import DB from '../constants/database-constants';
import bcrypt from 'bcrypt-nodejs';

export default (passport) => {
	const db = new Database();

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		const whereClause = `WHERE ${DB.tables.admin_users.columns.id} = ${db.escape(id)}`;
		db.selectOne(DB.tables.admin_users.name, whereClause).then((result, error) => {
			done(error, result[0]);
		});
	});

	passport.use(
		'local-signup',
		new PassportLocal.Strategy(
			{
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true,
			},
			(req, username, password, done) => {
				const whereClause = `WHERE ${DB.tables.admin_users.columns.username} = ${db.escape(username)}`;

				// Check if the user already exists with this username. If so we won't create a new user.
				db.selectOne(DB.tables.admin_users.name, whereClause)
					.then((result, error) => {
						if (result.length) {
							return done(null, false);
						} else {
							// Create a new user with these credentials.
							const newUser = {
								username,
								password,
							};

							const encryptedPassword = bcrypt.hashSync(password);

							db.clear();
							db.assign(DB.tables.admin_users.columns.username, username);
							db.assign(DB.tables.admin_users.columns.password, encryptedPassword);
							db.insert(DB.tables.admin_users.name).then((result) => {
								newUser.id = result.insertId;
								return done(null, newUser);
							});
						}
					})
					.catch((error) => {
						return done(error);
					});
			}
		)
	);
	

	passport.use(
		'local-login',
		new PassportLocal.Strategy(
			{
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true,
			},
			(req, username, password, done) => {
				const whereClause = `WHERE ${DB.tables.admin_users.columns.username} = ${db.escape(username)}`;

				console.log('login in passportjs');

				db.selectOne(DB.tables.admin_users.name, whereClause).then((result, error) => {
					if (error) {
						return done(error);
					}

					if (!result.length) {
						// No User Found
						return done(error);
					}

					if (!bcrypt.compareSync(password, result[0].password)) {
						// Incorrect password
						return done(null, false);
					}

					return done(null, result[0]);
				});
			}
		)
	);
};
