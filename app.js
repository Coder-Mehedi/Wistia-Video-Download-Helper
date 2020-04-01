const express = require("express");
const scrapData = require("./scrapper");

const app = express();
app.use(express.json());

app.get("/download/:id", async (req, res) => {
	try {
		const data = await scrapData(req.params.id);
		return res.json(JSON.parse(data));
	} catch (error) {
		return res.json({ msg: "Invalid Video ID" });
	}
});

app.listen(5000, () => console.log(`Server Started On Port 5000`));
