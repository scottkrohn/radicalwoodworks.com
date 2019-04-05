import Model from "./model";

class Image extends Model {

	constructor() {
		super();
		
		this.data = {
			id: null,
			thumb_url: null,
			main_url: null,
			hidden: null,
			is_primary: null,
		};
	}

	setId = (id) => {
		this.data.id = id;
	};
	setThumbUrl = (thumbUrl) => {
		this.data.thumb_url= thumbUrl;
	};
	setMainUrl = (mainUrl) => {
		this.data.main_url = mainUrl;
	};
	setHidden = (hidden) => {
		this.data.hidden = hidden;
	};
	setIsPrimary = (is_primary) => {
		this.data.is_primary = is_primary;
	};

	getId = () => {
		return this.data.id;
	};
	getThumbUrl = () => {
		return this.data.thumb_url;
	};
	getMainUrl = () => {
		return this.data.main_url;
	};
	getIsPrimary = () => {
		return this.data.is_primary;
	};
	getHidden = () => {
		return this.data.hidden;
	};

};

export default Image;