import { has } from 'lodash';

class Model {
    constructor() {
        this.data = {};
        this.children = {};
    }

	getValues = () => {
	    return {
	        ...this.data,
	        ...this.children,
	    };
	}

	setValues = (values) => {
	    for (var property in values) {
	        if (has(this.data, property)) {
	            this.data[property] = values[property];
	        }
	    }
	};
}

export default Model;

