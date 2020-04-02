import App from "./App.svelte";
import axios from "axios";

const getData = async () => {
	const res = await axios.get("http://localhost:4000/download/e2vgflin81");
	return res.data;
};
const app = new App({
	target: document.body,
	props: {
		name: "world",
		getData
	}
});

export default app;
