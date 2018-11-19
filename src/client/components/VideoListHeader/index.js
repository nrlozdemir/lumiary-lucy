"use strict";

import React from "react";
import style from "./style.scss";

const VideoListHeader = () => (
	<React.Fragment>
		<div className={style.container}>
			<div className="col-6">
				<div className={style.header}>Videos</div>
			</div>
			<div className="col-6">
				<div className={style.addNewButton}>
					<span className="qf-iconAdd" />
				</div>
			</div>
		</div>
	</React.Fragment>
);

export default VideoListHeader;
