"use strict";

import React from "react";
import PropTypes from "prop-types";

import VideoList from "../VideoList";
import VideoListHeader from "../VideoListHeader";

import styles from "./styles.scss";

const videos = [
	{
		id: 1,
		src: "https://picsum.photos/199/113"
	},
	{
		id: 2,
		src: "https://picsum.photos/199/113"
	},
	{
		id: 3,
		src: "https://picsum.photos/199/113"
	},
	{
		id: 4,
		src: "https://picsum.photos/199/113"
	},
	{
		id: 5,
		src: "https://picsum.photos/199/113"
	},
	{
		id: 6,
		src: "https://picsum.photos/199/113"
	},
	{
		id: 7,
		src: "https://picsum.photos/199/113"
	},
	{
		id: 8,
		src: "https://picsum.photos/199/113"
	}
];
class Aside extends React.Component {
	render() {
		const { router } = this.props;
		return (
			<div className={styles.aside}>
				<VideoListHeader />
				<VideoList router={router} videos={videos} />
			</div>
		);
	}
}

Aside.propTypes = {
	router: PropTypes.object
};

Aside.defaultProps = {};

export default Aside;
