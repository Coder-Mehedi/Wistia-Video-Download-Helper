const got = require("got");

(async () => {
	try {
		const response = await got(
			"http://fast.wistia.net/embed/iframe/e2vgflin81"
		);
		console.log(response.body);
		//=> '<!doctype html> ...'
	} catch (error) {
		console.log(error.response.body);
		//=> 'Internal server error ...'
	}
})();
