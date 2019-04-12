import BaseBLI from './base';

import DB from '../../constants/database-constants';

class ContentBLI extends BaseBLI {
	constructor() {
		super();
	}

	getContent = (contentType) => {
		const whereClause = `WHERE ${DB.tables.content.columns.type} = '${contentType}'`;
		return this.db.selectOne(DB.tables.content.name, whereClause);
	}

	createContent = (content) => {
		this.db.clear();

		this.db.assign(DB.tables.content.columns.type, content.getType());
		this.db.assign(DB.tables.content.columns.content, content.getContent());
		this.db.assign(DB.tables.content.columns.createdTs, content.getCreatedTs());
		this.db.assign(DB.tables.content.columns.updatedTs, content.getUpdatedTs());

		return this.db.insert(DB.tables.content.name);
	}

	updateContent = (content) => {

	}
}

export default ContentBLI;