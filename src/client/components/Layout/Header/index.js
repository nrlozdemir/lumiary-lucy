import React, { PureComponent } from "react";
// import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { browserHistory, Link } from "react-router";
// import cx from "classnames";
// import { staticUrl, mediaUrl } from "Utils/globals";

// Style
import style from "./styles.scss";
import NavBar from "../../NavBar";

class Header extends PureComponent {
	render() {
		const items = ["quickview", "marketview", "library", "panoptic"];
		return (
			<React.Fragment>
				<div className={style.navbar}>
					<NavBar items={items} />
				</div>
				<div className={style.brandLogo}>
					<div className={style.logo} />
				</div>
			</React.Fragment>
		);
	}
}

Header.propTypes = {};

Header.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	...bindActionCreators({}, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
