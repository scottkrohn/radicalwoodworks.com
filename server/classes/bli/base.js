import Database from '@db/db';
import mysql from 'mysql';

class BaseBLI {
  constructor() {
    this.db = new Database();
    this.escape = mysql.escape;
  }
}

export default BaseBLI;
