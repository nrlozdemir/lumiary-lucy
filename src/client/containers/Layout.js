import React from "react";
import Navbar from "Components/Navbar/index";
const Layout = props => {
	const Main = props.component;
	return (
		<React.Fragment>
			<Navbar match={props.match} />
			<Main match={props.match} />
		</React.Fragment>
	);
};
export default Layout;
