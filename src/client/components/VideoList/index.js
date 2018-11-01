"use strict";

import React from "react";
// import PropTypes from "prop-types";
// import ReactDOM from "react-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { actions } from "Reducers/home";

// Styles
import style from "./style.scss";
import VideoBackground from "../VideoBackground";
// Components
// import Loading from "../Loading";

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
		return (
			<div className={style.videoList}>
				{videos.map(video => (
					<VideoBackground key={video.id} src={video.src} />
				))}
			</div>
		);
	}
}

VideoList.propTypes = {};

VideoList.defaultProps = {};

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => ({
	...bindActionCreators({}, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VideoList);
