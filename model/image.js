import Model from "./model";

class Image extends Model {

	constructor() {
		super();
		
		this.data = {
			id: null,
			thumb_url: null,
			main_url: null,
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

	getId = () => {
		return this.data.id;
	};
	getThumbUrl = () => {
		return this.data.thumb_url;
	};
	getMainUrl = () => {
		return this.data.main_url;
	};
};

export default Image;