import React from 'react';
import { Link } from "react-router-dom";

import style from './style.scss'

const LibraryDetailHeader = ({ videoName, publishedPlatform }) => (
	<div className={style.header}>
		<div className="ml-40">
			<Link to="/library">
				<span className="qf-iconLeft-Arrow" />
				Back to Library
			</Link>
		</div>
		<div>{videoName}</div>
		<div className="mr-40">
			Published on {publishedPlatform}
			<span className={style.iconWrapper}>
							<i className="qf-iconFacebook" />
						</span>
		</div>
	</div>
);

export default LibraryDetailHeader;
