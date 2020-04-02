import React from "react";

const DownloadLinks = ({ data }) => {
	return (
		<div className="row">
			<div className="col m6 offset-m3">
				<ul className="collection">
					{Array.isArray(data) &&
						data.length > 0 &&
						data.map(dt => (
							<li className="collection-item" key={dt.display_name}>
								<a
									href={dt.url}
									download
									target="_blank"
									rel="noopener noreferrer"
									type="media_type"
								>
									<span>Quality: {dt.display_name}</span>
									<span>Size: {(dt.size / 1024 / 1024).toFixed(2)}MB</span>
								</a>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default DownloadLinks;
