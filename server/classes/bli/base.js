import Database from '../../db/db';

class BaseBLI {
	constructor() {
		this.db = new Database();
	}
};

export default BaseBLI;