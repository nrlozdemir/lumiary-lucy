"use strict";

import React from "react";
import style from "./style.scss";

const VideoListHeader = () => (
	<React.Fragment>
		<div className={style.container}>
			<div className={style.header}>Videos</div>
			<div className={style.addNewButton}>+</div>
		</div>
	</React.Fragment>
);

export default VideoListHeader;
