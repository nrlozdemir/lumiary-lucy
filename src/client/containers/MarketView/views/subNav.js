import React from "react";
import { Link } from "react-router";
// import PropTypes from "prop-types";
import style from "./styles.scss";
import { connect } from "react-redux";

const subNav = props => {
	const items = ["platform", "competitor", "audience", "use-case", "time"];
	return (
		<div className={style.subNav}>
			{items.map(item => {
				const label = item.replace("-", " ");
				return (
					<Link
						activeClassName={style.active}
						className={
							props.app.locationCurrent.split("/")[2] === item
								? style.active
								: null
						}
						key={item}
						to={`/marketview/${item}/`}
					>
						By {label}
					</Link>
				);
			})}
		</div>
	);
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(subNav);
