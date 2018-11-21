"use strict";

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import styles from "./styles.scss";

const Card = ({
	children,
	customHeaderClass,
	customBodyClass,
	title,
	removeHeader,
	headerIconRight,
	headerIconLeft,
	link,
	bottomTitle
}) => {
	return (
		<div className={styles.card}>
			{bottomTitle ? (
				<div className={styles.cardBody + " " + customBodyClass}>
					{children}
				</div>
			) : null}
			{!removeHeader ? (
				<div className={styles.cardHeader + " " + customHeaderClass}>
					{headerIconLeft && link ? <span className={headerIconLeft} /> : null}
					{link ? <Link to={link}>{title}</Link> : title}
					{headerIconRight && link ? (
						<span className={headerIconRight} />
					) : null}
				</div>
			) : null}
			{!bottomTitle ? (
				<div className={styles.cardBody + " " + customBodyClass}>
					{children}
				</div>
			) : null}
		</div>
	);
};

Card.propTypes = {
	title: PropTypes.string,
	children: PropTypes.object,
	customHeaderClass: PropTypes.string,
	customBodyClass: PropTypes.string,
	removeHeader: PropTypes.bool,
	headerIconRight: PropTypes.string,
	headerIconLeft: PropTypes.string,
	link: PropTypes.string
};

Card.defaultProps = {};

export default Card;
