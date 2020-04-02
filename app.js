const express = require("express");
const scrapData = require("./scrapper");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/download/:id", async (req, res) => {
	try {
		const data = await scrapData(req.params.id);
		return res.json(JSON.parse(data));
	} catch (error) {
		return res.json({ msg: "Invalid Video ID" });
	}
});

app.listen(4000, () => console.log(`Server Started On Port 4000`));
