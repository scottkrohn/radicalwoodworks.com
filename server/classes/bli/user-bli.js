import DB from '@constants-server/database-constants';
import BaseBLI from '@bli/base';
import { get } from 'lodash';
import User from '@models/user';
import EXCEPTIONS from '@constants/exceptions';
import bcrypt from 'bcrypt-nodejs';

class UserBLI extends BaseBLI {
  constructor() {
    super();
  }

  updateUser = async (userData) => {
    const { id } = userData || {};
    const existingUserData = await this.getUserById(id);

    if (!existingUserData) {
      throw EXCEPTIONS.apiError(EXCEPTIONS.userNotFound);
    }

    if (existingUserData) {
      const existingUserModel = new User();
      existingUserModel.setValues(existingUserData);

      // Overlay the updated values onto the existing user.
      existingUserModel.setValues(userData);

      if (this._assignUserValues(existingUserModel, true)) {
        const whereClause = `WHERE ${
          DB.tables.users.columns.id
        } = ${this.escape(id)}`;
        const result = await this.db.update(DB.tables.users.name, whereClause);
        if (result) {
          return existingUserModel;
        }
      }
    }
  };

  updateUserPassword = async (username, newPassword, oldPassword, user) => {
    if (!username || !newPassword) {
      throw new EXCEPTIONS.apiError(EXCEPTIONS.invalidRequest, 400);
    }

    if (!bcrypt.compareSync(oldPassword, user.password)) {
      throw new EXCEPTIONS.apiError(EXCEPTIONS.unauthorized, 401);
    }

    const encryptedPassword = bcrypt.hashSync(newPassword);

    this.db.clear();
    this.db.assignStr(DB.tables.users.columns.password, encryptedPassword);

    const whereClause = `WHERE ${
      DB.tables.users.columns.username
    } = ${this.escape(username)} AND ${
      DB.tables.users.columns.id
    } = ${this.escape(user.id)}`;

    await this.db.update(DB.tables.users.name, whereClause);
    const updatedUser = await this.getUserById(user.id);
    return updatedUser;
  };

  getUserById = async (userId) => {
    const whereClause = `WHERE ${DB.tables.users.columns.id} = ${this.escape(
      userId
    )}`;

    const resultRow = await this.db.selectOne(
      DB.tables.users.name,
      whereClause
    );

    return get(resultRow, '[0]', null);
  };

  _assignUserValues = (user, ignoreNull = true) => {
    this.db.clear();
    const usersColumns = DB.tables.users.columns;
    const userDatabaseMapping = DB.getUserDatabaseFieldsMapping(user);

    let fieldsAssigned = false;
    for (const field in userDatabaseMapping) {
      // Ignore primary key and non-updatable fields.
      if (
        field === usersColumns.id ||
        field === usersColumns.password ||
        field === usersColumns.username
      ) {
        continue;
      }
      const value = userDatabaseMapping[field];
      if (ignoreNull && value === null) {
        continue;
      }

      switch (field) {
        case usersColumns.type:
        case usersColumns.email:
        case usersColumns.firstName:
        case usersColumns.lastName:
        case usersColumns.address:
        case usersColumns.addressTwo:
        case usersColumns.zip:
        case usersColumns.aptSuite:
        case usersColumns.city:
        case usersColumns.state:
          this.db.assignStr(field, value);
          fieldsAssigned = true;
          break;
      }
    }

    return fieldsAssigned;
  };
}

export default UserBLI;
