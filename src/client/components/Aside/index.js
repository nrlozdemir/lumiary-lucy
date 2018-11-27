"use strict";

import React from "react";
import PropTypes from "prop-types";
import { videos } from "../../containers/Library/options";

import VideoList from "../VideoList";
import VideoListHeader from "../VideoListHeader";
import styles from "./styles.scss";

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
