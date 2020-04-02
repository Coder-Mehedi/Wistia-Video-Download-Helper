import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import DownloadLinks from "./DownloadLinks";
import copy from "copy-to-clipboard";

function App() {
	const [link, setLink] = useState("");
	const [id, setId] = useState("");
	const [data, setData] = useState([]);
	const [realName, setRealName] = useState("");

	useEffect(() => {
		setId(grabId());
		setRealName(genRealName());
		// eslint-disable-next-line
	}, [link]);

	const genRealName = () => {
		const regex = />\d{3}.+?.mp4/;
		let matched = link.match(regex);
		if (matched !== null && matched.length > 0) {
			matched = matched[0];
			matched = matched.split(">")[1];
			console.log(matched);
			return matched;
		}
	};

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
		<div className="App center">
			<h1>wistia Video Download Helper</h1>
			<div className="row">
				<form onSubmit={handleSubmit} className="col m6 offset-m3">
					<input
						type="text"
						onChange={handleChange}
						value={link}
						placeholder="Enter Video Id"
					/>
					<button className="btn red right">Submit</button>
				</form>
			</div>
			<div className="filename center">
				<h2 onClick={() => copy(realName)}>{realName}</h2>
			</div>
			<DownloadLinks data={data} />
		</div>
	);
}

export default App;
