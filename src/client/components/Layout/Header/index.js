import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router";
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
					<Link to="/library/">
						<div className={style.logo} />
					</Link>
				</div>
			</React.Fragment>
		);
	}
}

Header.propTypes = {
	router: PropTypes.object
};

Header.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	...bindActionCreators({}, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
