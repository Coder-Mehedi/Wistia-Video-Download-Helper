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
	const [tooltiptText, setTooltipText] = useState("Click to copy");

	const [autoSubmit, setAutoSubmit] = useState(true);

	useEffect(() => {
		setId(grabId());
		setRealName(genRealName());
		// eslint-disable-next-line
	}, [link, id]);

	useEffect(() => {
		autoSubFunc();
	}, [realName]);

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

	const autoSubFunc = async () => {
		if (!autoSubmit) return;
		return setData(await getData(id));
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
				<form onSubmit={handleSubmit} className="col m8 offset-m2 form">
					<div className="checkboxes">
						<p>
							<label>
								<input
									type="checkbox"
									checked={autoSubmit ? "checked" : ""}
									onChange={() => setAutoSubmit(!autoSubmit)}
								/>
								<span>Auto Submit</span>
							</label>
						</p>
						{/* <p>
							<label>
								<input type="checkbox" />
								<span>Auto Clear</span>
							</label>
						</p> */}
					</div>
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
					className="tooltip"
					onClick={() => {
						copy(realName);
						setTooltipText("Copied");
					}}
				>
					{realName}
					<span className="tooltiptext">{tooltiptText}</span>
				</h3>
			</div>
			{data.length >= 1 && <DownloadLinks data={data} realName={realName} />}
		</div>
	);
}

export default App;
