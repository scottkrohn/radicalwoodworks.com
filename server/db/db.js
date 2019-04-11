import mysql from 'mysql';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

let connectionPool;

class Database {
	constructor() {
		if (!connectionPool) {
			connectionPool = this._connectToDatabase();
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

	insert = (tableName) => {
		const insertSql = this._getInsertSql(tableName);
		return this.query(insertSql);
	}

	delete = (tableName, whereClause) => {
		const sql = `DELETE FROM \`${tableName}\` ${whereClause}`;
		return this.query(sql)
	}

	selectOne = (tableName, whereClause) => {
		const sql = `SELECT * FROM \`${tableName}\` ${whereClause} LIMIT 1`;
		return this.query(sql);
	};

	selectAll = (tableName, whereClause, callback) => {
		const sql = `SELECT * FROM \`${tableName}\``

		if (whereClause) {
			sql += ` ${whereClause}`;
		}

		return this.query(sql);
	};

	query = (sqlString = '') => {
		return new Promise((resolve, reject) => {
			connectionPool.query(sqlString, (error, results, fields) => {
				if (error) { 
					reject(error);
				}
				resolve(results);
			});
		});
	};

	/*************************/
	/* Private-ish Functions */
	/*************************/

	_connectToDatabase = () => {
		const configPath = path.join(__dirname, '../../config/config.yaml');
		const config = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
		connectionPool = mysql.createPool(config);

		connectionPool.on('error', (err) => {
			console.log(`Lost connection to MySQL server with error: ${err}`);
		});

		return connectionPool;
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
