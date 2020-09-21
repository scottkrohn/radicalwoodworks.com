import DB from '@constants-server/database-constants';
import BaseBLI from '@bli/base';
import { get } from 'lodash';
import User from '@models/user';
import EXCEPTIONS from '@constants/exceptions';

class UserBLI extends BaseBLI {
  constructor() {
    super();
  }

  updateUser = async (userData) => {
    const { id } = userData || {};
    const existingUserRows = await this.getUserById(id);
    const existingUserData = get(existingUserRows, '[0]', null);

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

  getUserById = async (userId) => {
    const whereClause = `WHERE ${DB.tables.users.columns.id} = ${this.escape(
      userId
    )}`;

    return this.db.selectOne(DB.tables.users.name, whereClause);
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
