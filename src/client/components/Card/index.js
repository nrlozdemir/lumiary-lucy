"use strict";

import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.scss";

class Card extends React.Component {
	render() {
		const {
			children,
			customHeaderClass,
			customBodyClass,
			title,
			removeHeader
		} = this.props;
		return (
			<div className={styles.card}>
				{!removeHeader ? (
					<div className={styles.cardHeader + " " + customHeaderClass}>
						{title}
					</div>
				) : null}
				<div className={styles.cardBody + " " + customBodyClass}>
					{children}
				</div>
			</div>
		);
	}
}

Card.propTypes = {
	title: PropTypes.string,
	children: PropTypes.object,
	customHeaderClass: PropTypes.string,
	customBodyClass: PropTypes.string,
	removeHeader: PropTypes.bool
};

Card.defaultProps = {};

export default Card;
