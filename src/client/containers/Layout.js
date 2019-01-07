import React from "react";
import Navbar from "Components/Navbar/index";
const Layout = props => {
	const Main = props.component;
	const { removeNavbar } = props;
	return (
		<React.Fragment>
			{!removeNavbar ? <Navbar /> : null}
			<Main match={props.match} />
		</React.Fragment>
	);
};
export default Layout;
