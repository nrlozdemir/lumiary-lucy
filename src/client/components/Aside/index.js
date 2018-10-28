"use strict";

import React from "react";
// import PropTypes from "prop-types";
// import ReactDOM from "react-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { actions } from "Reducers/home";

// Styles

// Components
// import Loading from "../Loading";
import VideoList from "../VideoList";

class Aside extends React.Component {
	render() {
		return <VideoList />;
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
