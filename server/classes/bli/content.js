import BaseBLI from './base';
import { isEmpty } from 'lodash';

import DB from '../../constants/database-constants';
import Content from '../../../model/content';

class ContentBLI extends BaseBLI {
    constructor() {
        super();
    }

	getContent = async (contentType) => {
	    const whereClause = `WHERE ${DB.tables.content.columns.type} = '${contentType}'`;
	    const contentRow = await this.db.selectOne(DB.tables.content.name, whereClause);
	    const contentObject = this.buildContentObject(contentRow);
	    return contentObject;
	}

	getAllContent = async (category = null) => {
	    const whereClause = (category) ? `WHERE ${DB.tables.content.columns.category} = '${category}'` : '';
	    const contentRows = await this.db.selectAll(DB.tables.content.name, whereClause);

	    const contentObjects = [];
	    for (const contentRow of contentRows) {
	        const contentObject = this.buildContentObject(contentRow);
	        contentObjects.push(contentObject);
	    }

	    return contentObjects;
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

	buildContentObject = (contentData) => {
	    const content = new Content();
	    content.setValues(contentData);
	    return content;
	}
}


export default ContentBLI;
