"use strict";

import React from "react";
// import PropTypes from "prop-types";
// import ReactDOM from "react-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { actions } from "Reducers/home";

// import { Link } from "react-router";

// Styles
import style from "./styles.scss";

// Components
// import Loading from "Components/Loading";

class HomePage extends React.Component {
	render() {
		return <div className={style.main}>Main</div>;
	}
}

HomePage.propTypes = {};

HomePage.defaultProps = {};

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => ({
	...bindActionCreators({}, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomePage);
