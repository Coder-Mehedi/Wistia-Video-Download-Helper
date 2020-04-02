import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import DownloadLinks from "./DownloadLinks";

function App() {
	const [id, setId] = useState("");
	const [data, setData] = useState([]);
	const [link, setLink] = useState("");

	const getData = async id => {
		const res = await axios.get(`http://localhost:4000/download/${id}`);
		return res.data;
	};

	const grabId = () => {
		const regex = /wvideo=.{10}/;
		let matched = link.match(regex);
		if (matched !== null && matched.length > 0) {
			matched = matched[0];
			matched = matched.split("=")[1];
			console.log(matched);
			return matched;
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const id = grabId();
		const fetchedData = await getData(id);
		setData(fetchedData);
	};
	return (
		<div className="App row">
			<h1>Wastia Video Download Helper</h1>
			<form onSubmit={handleSubmit} className="col m6 offset-m3">
				<input
					type="text"
					onChange={e => setLink(e.target.value)}
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
