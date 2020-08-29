import PassportLocal from 'passport-local';
import Database from '../db/db';
import DB from '../constants/database-constants';
import bcrypt from 'bcrypt-nodejs';
import EXCEPTIONS from '../../constants/exceptions';
import { get } from 'lodash';
import AUTH from '@constants-server/auth-constants';

export default (passport) => {
  const db = new Database();

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    const whereClause = `WHERE ${DB.tables.users.columns.id} = ${db.escape(
      id
    )}`;
    db.selectOne(DB.tables.users.name, whereClause).then((result, error) => {
      return done(error, result[0] || null);
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
        const whereClause = `WHERE ${
          DB.tables.users.columns.username
        } = ${db.escape(username)}`;

        // Check if the user already exists with this username. If so we won't create a new user.
        db.selectOne(DB.tables.users.name, whereClause)
          .then((result) => {
            if (result.length) {
              return done(null, false, { conflict: true });
            } else {
              // Create a new user with these credentials.
              const newUser = {
                username,
                password,
              };

              const encryptedPassword = bcrypt.hashSync(password);

              const { email, firstName, lastName } = req.body;

              db.clear();
              db.assignStr(DB.tables.users.columns.username, username);
              db.assignStr(DB.tables.users.columns.password, encryptedPassword);
              db.assignStr(DB.tables.users.columns.email, email);
              db.assignStr(DB.tables.users.columns.firstName, firstName);
              db.assignStr(DB.tables.users.columns.lastName, lastName);

              db.assignStr(
                DB.tables.users.columns.type,
                AUTH.USER_TYPES.CUSTOMER
              );

              db.insert(DB.tables.users.name).then((result) => {
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
        const whereClause = `WHERE ${
          DB.tables.users.columns.username
        } = ${db.escape(username)}`;

        db.selectOne(DB.tables.users.name, whereClause).then(
          (result, error) => {
            if (error) {
              return done(error);
            }

            if (!result.length) {
              // No User Found
              return done(null, false, EXCEPTIONS.invalidCredentials);
            }

            const user = result[0];

            if (!bcrypt.compareSync(password, user.password)) {
              // Incorrect password
              console.log(
                `${user.username} failed to log in, invalid password.`
              );
              return done(null, false, EXCEPTIONS.invalidCredentials);
            }

            const userResponse = {
              username: user.username,
              id: user.id,
            };

            console.log(`${user.username} successfully logged in!`);
            return done(null, userResponse);
          }
        );
      }
    )
  );
};
