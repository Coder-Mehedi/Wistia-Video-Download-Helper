const express = require("express");
const scrapData = require("./scrapper");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.get("/download/:id", async (req, res) => {
	try {
		const data = await scrapData(req.params.id);
		return res.json(JSON.parse(data));
	} catch (error) {
		return res.json({ error: "Invalid Video ID" });
	}
});

app.listen(4000, () => console.log(`Server Started On Port 4000`));
