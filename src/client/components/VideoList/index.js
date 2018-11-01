"use strict";

import React from "react";
import PropTypes from "prop-types";

// Styles
import style from "./style.scss";
// Components
import Video from "../Video";

const videos = [
	{
		id: 1,
		src: "https://picsum.photos/300/200"
	},
	{
		id: 2,
		src: "https://picsum.photos/300/200"
	},
	{
		id: 3,
		src: "https://picsum.photos/300/200"
	},
	{
		id: 4,
		src: "https://picsum.photos/300/200"
	},
	{
		id: 5,
		src: "https://picsum.photos/300/200"
	},
	{
		id: 6,
		src: "https://picsum.photos/300/200"
	},
	{
		id: 7,
		src: "https://picsum.photos/300/200"
	},
	{
		id: 8,
		src: "https://picsum.photos/300/200"
	}
];

class VideoList extends React.Component {
	render() {
		const { router } = this.props;
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
	router: PropTypes.object
};

VideoList.defaultProps = {};

export default VideoList;
