"use strict";

import React from "react";
import PropTypes from "prop-types";

// Styles
import style from "./style.scss";
// Components
import Video from "../Video";

class VideoList extends React.Component {
	render() {
		const { router, videos } = this.props;
		return (
			<div className={style.videoList}>
				{videos.map(video => (
					<Video key={video.id} video={video} router={router} />
				))}
			</div>
		);
	}
}

VideoList.propTypes = {
	router: PropTypes.object,
	videos: PropTypes.array
};

VideoList.defaultProps = {};

export default VideoList;
