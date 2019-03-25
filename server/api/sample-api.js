import axios from 'axios';

class SampleApi {

	constructor(req) {
	}

	getSampleInformation(req, callback) {
		return new Promise((resolve, reject) => {
			axios.get('https://api.github.com/users/scottkrohn/repos')
				.then((response) => {
					resolve(response);
				})
				.catch((err) => {
					// Do stuff with the error.
				});
		});
	}
}

export default SampleApi;