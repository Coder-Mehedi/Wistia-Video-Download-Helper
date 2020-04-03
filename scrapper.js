const got = require("got");

const scrapData = async id => {
	try {
		const response = await got(`http://fast.wistia.net/embed/iframe/${id}`);
		const html = response.body;

		// const regex = new RegExp(/http:\/\/embed.wistia.com\/deliveries\/.+.bin*/);
		const regex = new RegExp(/\[{"type.+?}]/);
		let matched = html.match(regex);
		if (matched !== null && matched.length > 0) {
			matched = matched[0];
			return matched;
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = scrapData;
