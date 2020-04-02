const got = require("got");

const id = "e2vgflin81";

// regex for grabbing video
const rex = /wvideo=.{10}/;

const scrapData = async id => {
	try {
		const response = await got(`http://fast.wistia.net/embed/iframe/${id}`);

		const html = response.body;

		// const regex = new RegExp(/http:\/\/embed.wistia.com\/deliveries\/.+.bin*/);
		const regex = new RegExp(/\[{"type.+?}]/);
		let matched = html.match(regex);
		if (matched !== null && matched.length > 0) {
			matched = matched[0];
			matched = `${matched}`;
			// writeStream.write(matched);
			return matched;
		}
	} catch (error) {
		console.log(error);
	}
};
// scrapData(id);
module.exports = scrapData;
