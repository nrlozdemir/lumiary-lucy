"use strict";

import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions } from "Reducers/home";

import { Link } from "react-router";

// Styles

// Components
import Loading from "../Loading";

class LeftSide extends React.Component {
	render() {
		return <div>LeftSide</div>;
	}
}

LeftSide.propTypes = {};

LeftSide.defaultProps = {};

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => ({
	...bindActionCreators({}, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LeftSide);
