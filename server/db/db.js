import mysql from 'mysql';

// Constants
import DB_SETTINGS from './db-settings';

let connection;

class Database {
	constructor() {
		if (!connection) {
			connection = this._connectToDatabase();
		}

		this.clear();
	}

	assign = (field, value) => {
		this.fields[field] = value;
	};

	assignBoolean = (field, value) => {
		this.fields[field] = (value) ? 1 : 0;
	};

	clear = () => {
		this.fields = {};
	}

	getFields = () => {
		return this.fields;
	}

	insert = (tableName, callback) => {
		const insertSql = this._getInsertSql(tableName);
		this.query(insertSql, null, callback);
	}

	delete = (tableName, whereClause, callback) => {
		const sql = `DELETE FROM \`${tableName}\` ${whereClause}`;
		this.query(sql, null, callback)
	}

	selectOne = (tableName, whereClause, callback) => {
		const sql = `SELECT * FROM \`${tableName}\` ${whereClause} LIMIT 1`;
		this.query(sql, null, callback);
	};

	selectAll = (tableName, whereClause, callback) => {
		const sql = `SELECT * FROM \`${tableName}\``

		if (whereClause) {
			sql += ` ${whereClause}`;
		}

		this.query(sql, null, callback);
	};

	query = (sqlString = '', values = null, callback) => {
		if (values) {
			connection.query(sqlString, values, (error, results, fields) => {
				if (typeof callback === 'function') {
					callback(error, results, fields);
				}
			});
		} else {
			connection.query(sqlString, (error, results, fields) => {
				if (typeof callback === 'function') {
					callback(error, results, fields);
				}
			});
		}
	};

	/*************************/
	/* Private-ish Functions */
	/*************************/

	_connectToDatabase = () => {
		connection = mysql.createConnection(DB_SETTINGS);
		connection.connect((err) => {
			if (err) {
				console.log('Error connecting to database.');
			} else {
				console.log('Successfully connected to database.');
			}
		});

		return connection;
	};

	_getInsertSql = (tableName) => {
		let fieldStr = '';
		let valuesStr = '';


		for (let field in this.fields) {
			const fieldSeparator = (fieldStr !== '') ? ', ': '';
			const valuesSeparator = (valuesStr !== '') ? ', ': '';

			fieldStr += `${fieldSeparator}\`${field}\``;
			valuesStr += `${valuesSeparator}\'${this.fields[field]}\'`;
		}

		const sql = `INSERT INTO \`${tableName}\` (${fieldStr}) values (${valuesStr})`;
		return sql;
	}
}

export default Database;
