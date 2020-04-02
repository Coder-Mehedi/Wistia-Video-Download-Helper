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
		const regex = />\d+.+?.mp4/;
		let matched = link.match(regex);
		if (matched !== null && matched.length > 0) {
			matched = matched[0];
			matched = matched.split(">")[1];
			return matched;
		}
	};

	const getData = async id => {
		const res = await axios.get("/download/" + id);
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
			<h1 className="grey lighten-2 indigo-text">
				Wistia Video Download Helper
			</h1>
			<div className="row">
				<form onSubmit={handleSubmit} className="col m6 offset-m3 form">
					<input
						type="text"
						onChange={handleChange}
						value={link}
						placeholder="Enter your copied link and thumbnail clipboard"
					/>
					<button className="btn red right">Submit</button>
				</form>
			</div>
			<div className="filename center">
				<h3
					onClick={() => copy(realName)}
					className="tooltipped"
					data-position="top"
					data-tooltip="Click to copy"
				>
					{realName}
				</h3>
			</div>
			{data.length > 0 && <DownloadLinks data={data} />}
		</div>
	);
}

export default App;
