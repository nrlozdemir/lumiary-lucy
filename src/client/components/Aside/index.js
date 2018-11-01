"use strict";

import React from "react";
import PropTypes from "prop-types";

import VideoList from "../VideoList";
import VideoListHeader from "../VideoListHeader";

import styles from './styles.scss';

class Aside extends React.Component {
	render() {
		const { router } = this.props;
		return (
			<div className={styles.aside}>
				<VideoListHeader />
				<br />
				<VideoList router={router} />
			</div>
		);
	}
}

Aside.propTypes = {
	router: PropTypes.object
};

Aside.defaultProps = {};

export default Aside;
