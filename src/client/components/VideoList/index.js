"use strict";

import React from "react";
// import PropTypes from "prop-types";
// import ReactDOM from "react-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { actions } from "Reducers/home";

// Styles
import style from "./style.scss";
// Components
// import Loading from "../Loading";

class VideoList extends React.Component {
	render() {
		return (
			<div className={style.videoList}>
				<div>VideoList</div>
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
