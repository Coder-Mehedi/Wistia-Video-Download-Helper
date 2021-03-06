const express = require("express");
const scrapData = require("./scrapper");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/download/:id", async (req, res) => {
	try {
		const data = await scrapData(req.params.id);
		return res.json(JSON.parse(data));
	} catch (error) {
		return res.json({ error: "Invalid Video ID" });
	}
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`));
