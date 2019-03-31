import { has } from 'lodash';

class Model {
	constructor() {
		this.data = {};
	}

	getValues = () => {
		return this.data;
	}

	setValues = (values) => {
		for (var property in values) {
			if (has(this.data, property)) {
				this.data[property] = values[property];
			}
		}
	};
};

export default Model;

