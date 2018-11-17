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
			removeHeader,
			headerIconRight,
			headerIconLeft
		} = this.props;
		return (
			<div className={styles.card}>
				{!removeHeader ? (
					<div className={styles.cardHeader + " " + customHeaderClass}>
						{headerIconLeft ? <span className={headerIconLeft} /> : null}
						{title}
						{headerIconRight ? <span className={headerIconRight} /> : null}
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
	removeHeader: PropTypes.bool,
	headerIconRight: PropTypes.string,
	headerIconLeft: PropTypes.string
};

Card.defaultProps = {};

export default Card;
