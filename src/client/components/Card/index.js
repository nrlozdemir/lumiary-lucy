"use strict";

import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.scss";

class Card extends React.Component {
	render() {
		const { children, customHeaderClass, customBodyClass, title } = this.props;
		return (
			<div className={styles.card}>
				<div className={styles.cardHeader + " " + customHeaderClass}>{title}</div>
				<div className={styles.cardBody + " " + customBodyClass}>{children}</div>
			</div>
		);
	}
}

Card.propTypes = {
	title: PropTypes.string,
	children: PropTypes.object,
	customHeaderStyle: PropTypes.string,
	customBodyStyle: PropTypes.string
};

Card.defaultProps = {};

export default Card;
