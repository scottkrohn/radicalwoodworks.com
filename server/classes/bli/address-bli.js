import { get } from 'lodash';
import BaseBLI from '@bli/base';
import Address from '@models/address';
import DB from '@constants-server/database-constants';
import OrderBLI from '@bli/order-bli';

class AddressBLI extends BaseBLI {
  constructor() {
    super();
  }

  /**
   *
   * @param {Address} address
   */
  createOrUpdateAddress = async (addressData, orderId) => {
    const orderBli = new OrderBLI();
    const order = await orderBli.getOrderByOrderId(orderId);
    const addressModel = new Address();
    addressModel.setValues(addressData);

    if (this._assignAddressValues(addressModel)) {
      if (order.getAddressId()) {
        const whereClause = `WHERE ${
          DB.tables.addresses.columns.id
        } = ${parseInt(order.getAddressId())}`;

        if (addressModel.getUserId() === null) {
          this.db.assign(DB.tables.addresses.columns.userId, null);
        }

        await this.db.update(DB.tables.addresses.name, whereClause);

        addressModel.setId(order.getAddressId());
        order.setAddress(addressModel);

        return order;
      } else {
        const result = await this.db.insert(DB.tables.addresses.name);
        const addressId = result.insertId;
        await orderBli.addAddressIdToOrder(orderId, addressId);

        addressModel.setId(addressId);
        order.setAddressId(addressId);
        order.setAddress(addressModel);

        return order;
      }
    }
  };

  getAddress = async (addressId) => {
    const whereClause = `WHERE ${
      DB.tables.addresses.columns.id
    } = ${this.escape(addressId)}`;

    const addressRow = await this.db.selectOne(
      DB.tables.addresses.name,
      whereClause
    );

    const addressData = get(addressRow, '[0]', null);
    if (!addressData) {
      return null;
    }

    const address = new Address();
    address.setValues(addressData);

    return address;
  };

  /**
   *
   * @param {Address} address
   * @param {Boolean} ignoreNull
   */
  _assignAddressValues = (address, ignoreNull = true) => {
    this.db.clear();

    const addressColumns = DB.tables.addresses.columns;
    const addressDatabaseMapping = DB.getAddressDatabaseFieldsMapping(address);

    let fieldsAssigned = false;
    for (const field in addressDatabaseMapping) {
      // Ignore primary key.
      if (field === addressColumns.id) {
        continue;
      }

      const value = addressDatabaseMapping[field];
      if (ignoreNull && value === null) {
        continue;
      }

      switch (field) {
        case addressColumns.type:
        case addressColumns.firstName:
        case addressColumns.lastName:
        case addressColumns.address:
        case addressColumns.addressTwo:
        case addressColumns.aptSuite:
        case addressColumns.zip:
        case addressColumns.city:
        case addressColumns.state:
        case addressColumns.email:
          fieldsAssigned = true;
          this.db.assignStr(field, value);
          break;

        case addressColumns.userId:
          fieldsAssigned = true;
          this.db.assign(field, value);
          break;
      }
    }

    return fieldsAssigned;
  };
}

export default AddressBLI;
