import DB from '@constants-server/database-constants';
import { get } from 'lodash';

const addLimitOffsetOrder = (limit, offset, sort, tableName) => {
  let query = '';

  if (sort) {
    const col = get(DB, `tables[${tableName}].columns[${sort}]`, null);
    if (col) {
      query += ` ORDER BY ${col}`;
    }
  }

  if (!isNaN(parseInt(limit))) {
    query += ` LIMIT ${parseInt(limit)}`;
  }

  if (!isNaN(parseInt(offset))) {
    query += ` OFFSET ${parseInt(offset)}`;
  }

  return query;
};

export default { addLimitOffsetOrder };
