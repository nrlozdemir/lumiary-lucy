import React from "react";
import { Link } from "react-router";
// import PropTypes from "prop-types";
import style from "./styles.scss";
import { ucfirst } from "../../utils";
import { connect } from "react-redux";

const NavBar = props => {
	const { items, handleClick, baseUrl } = props;
	return (
		<div>
			<nav className={style.navigation} role="navigation">
				<div className={style.navlist}>
					{items.length &&
						items.map((key, idx) => {
							const label = ucfirst(key);
							return (
								key != "undefined" && (
									<Link
										className={
											(props.app.locationCurrent.split("/")[1] ===
												"marketview" &&
												key === "marketview") ||
											(props.app.locationCurrent.split("/")[1] === "library" &&
												key === "library")
												? style.active
												: null
										}
										activeClassName={style.active}
										key={idx}
										to={`/${key}/`}
									>
										<span>{label}</span>
									</Link>
								)
							);
						})}
				</div>
			</nav>
		</div>
	);
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavBar);
