import React from "react";
import cx from "classnames";

import style from "./styles.scss";

const VideoBackground = ({ src, children, className }) => {
	return (
		<img className={cx(style.videoBackground, className)} draggable src={src}>
			{children}
		</img>
	);
};

VideoBackground.defaultProps = {};

export default VideoBackground;
