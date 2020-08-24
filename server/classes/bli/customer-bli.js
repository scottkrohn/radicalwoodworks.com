import { get } from 'lodash';
import BaseBLI from '@bli/base';
import Customer from '@models/customer';
import DB from '@constants-server/database-constants';
import OrderBLI from '@bli/order-bli';

class CustomerBLI extends BaseBLI {
  constructor() {
    super();
  }

  /**
   *
   * @param {Customer} customer
   */
  createOrUpdateCustomer = async (customerData, orderId) => {
    const orderBli = new OrderBLI();
    const order = await orderBli.getOrderByOrderId(orderId);
    const customerModel = new Customer();
    customerModel.setValues(customerData);

    if (this._assignCustomerValues(customerModel)) {
      if (order.getCustomerId()) {
        const whereClause = `WHERE ${
          DB.tables.customers.columns.id
        } = ${parseInt(order.getCustomerId())}`;

        await this.db.update(DB.tables.customers.name, whereClause);

        customerModel.setId(order.getCustomerId());
        order.setCustomer(customerModel);

        return order;
      } else {
        const result = await this.db.insert(DB.tables.customers.name);
        const customerId = result.insertId;
        await orderBli.addCustomerIdToOrder(orderId, customerId);

        customerModel.setId(customerId);
        order.setCustomerId(customerId);
        order.setCustomer(customerModel);

        return order;
      }
    }
  };

  getCustomer = async (customerId) => {
    const whereClause = `WHERE ${DB.tables.customers.columns.id} = ${parseInt(
      customerId
    )}`;

    const customerRow = await this.db.selectOne(
      DB.tables.customers.name,
      whereClause
    );

    const customerData = get(customerRow, '[0]', null);
    if (!customerData) {
      return null;
    }

    const customer = new Customer();
    customer.setValues(customerData);

    return customer;
  };

  /**
   *
   * @param {Customer} customer
   * @param {Boolean} ignoreNull
   */
  _assignCustomerValues = (customer, ignoreNull = true) => {
    this.db.clear();

    const customerColumns = DB.tables.customers.columns;
    const customerDatabaseMapping = DB.getCustomerDatabaseFieldsMapping(
      customer
    );

    let fieldsAssigned = false;
    for (const field in customerDatabaseMapping) {
      // Ignore primary key.
      if (field === customerColumns.id) {
        continue;
      }

      const value = customerDatabaseMapping[field];
      if (ignoreNull && value === null) {
        continue;
      }

      switch (field) {
        case customerColumns.type:
        case customerColumns.firstName:
        case customerColumns.lastName:
        case customerColumns.address:
        case customerColumns.aptSuite:
        case customerColumns.zip:
        case customerColumns.city:
        case customerColumns.state:
        case customerColumns.email:
          fieldsAssigned = true;
          this.db.assignStr(field, value);
          break;

        case customerColumns.userId:
          fieldsAssigned = true;
          this.db.assign(field, value);
          break;
      }
    }

    return fieldsAssigned;
  };
}

export default CustomerBLI;
