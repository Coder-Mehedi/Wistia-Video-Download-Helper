import React from "react";

const DownloadLinks = ({ data }) => {
	return (
		<div className="col m6 offset-m3">
			<ul className="collection">
				{data.length > 0 &&
					data.map(dt => (
						<li className="collection-item">
							<a href={dt.url}>{dt.display_name}</a>
						</li>
					))}
			</ul>
		</div>
	);
};

export default DownloadLinks;
