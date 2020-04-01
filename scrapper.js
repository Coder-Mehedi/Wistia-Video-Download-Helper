const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const got = require("got");

// const url = "http://fast.wistia.net/embed/iframe/e2vgflin81";
const id = "e2vgflin81";

const scrapData = async id => {
	// const writeStream = fs.createWriteStream("data.json");
	try {
		const response = await got(`http://fast.wistia.net/embed/iframe/${id}`);

		const $ = response.body;

		const regex = new RegExp(/http:\/\/embed.wistia.com\/deliveries\/.+.bin*/);
		let matched = $.match(regex);
		if (matched !== null && matched.length > 0) {
			matched = matched[0];
			matched = `[{ "url": "${matched}" }]`;
			// writeStream.write(matched);
			return matched;
		}
	} catch (error) {
		console.log(error);
	}

	// data = matched;
	// return data;
};
module.exports = scrapData;
