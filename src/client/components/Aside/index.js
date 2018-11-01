"use strict";

import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import VideoList from "../VideoList";
import VideoListHeader from "../VideoListHeader";

import styles from './styles.scss';

class Aside extends React.Component {
	render() {
		return (
			<div className={styles.aside}>
				<VideoListHeader />
				<br />
				<VideoList />
			</div>
		);
	}
}

Aside.propTypes = {};

Aside.defaultProps = {};

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => ({
	...bindActionCreators({}, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Aside);
