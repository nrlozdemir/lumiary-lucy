"use strict";

import React from "react";

// Styles
import style from "./styles.scss";

class Library extends React.Component {
	render() {
		console.log(this.props);
		return <div className={style.main}>ali {this.props.params.id}</div>;
	}
}

Library.propTypes = {};

Library.defaultProps = {};

export default Library;
