import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import DownloadLinks from "./DownloadLinks";

function App() {
	const [link, setLink] = useState("");
	const [id, setId] = useState("");
	const [data, setData] = useState([]);

	useEffect(() => {
		setId(grabId());
		// eslint-disable-next-line
	}, [link]);

	const getData = async id => {
		const res = await axios.get("/download/" + id);
		console.log(res.data);
		return res.data;
	};

	const grabId = () => {
		const regex = /wvideo=.{10}/;
		let matched = link.match(regex);
		if (matched !== null && matched.length > 0) {
			matched = matched[0];
			matched = matched.split("=")[1];
			return matched;
		}
	};

	const handleChange = async e => {
		setLink(e.target.value);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		return setData(await getData(id));
	};
	return (
		<div className="App row">
			<h1>Wastia Video Download Helper</h1>
			<form onSubmit={handleSubmit} className="col m6 offset-m3">
				<input
					type="text"
					onChange={handleChange}
					value={link}
					placeholder="Enter Video Id"
				/>
				<button className="btn red">Submit</button>
			</form>
			<DownloadLinks data={data} />
		</div>
	);
}

export default App;
