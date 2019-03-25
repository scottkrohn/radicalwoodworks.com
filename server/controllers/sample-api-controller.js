import SampleApi from '../api/sample-api';

// Constants
import REQUEST from '../constants/request-constants';

module.exports = (req, res, next) => {
	const sampleApi = new SampleApi(req);

	if (req.method === REQUEST.method.get) {
		sampleApi.getSampleInformation(req).then((response) => {
			res.json(response.data);
		});
	}
};