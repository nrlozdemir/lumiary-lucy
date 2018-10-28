import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

//import Script from 'react-load-script'
import style from "../components/Layout/styles.scss";
import layoutStyle from "../components/Layout/layout.scss";
import { Footer, Header } from "../components/Layout";
import Aside from "../components/Aside";

const Layout = ({ children, header, main, location: { pathname } }) => (
	<div style={style} className="layout">
		<Helmet>
			<meta
				name="viewport"
				content="width=device-width,initial-scale=1,shrink-to-fit=no"
			/>
		</Helmet>
		<div className={layoutStyle.headerSide}>
			{pathname.match(/(signup|project(\/custom|\/menu))/) ? null : <Header />}
		</div>
		<div className={layoutStyle.aside}>
			<Aside />
		</div>
		<div className={layoutStyle.mainSide}>
			{children}
			{main}
		</div>
		{/* pathname.match(/(signup|project(\/custom|\/menu))/) ? null : <Footer /> */}
	</div>
);

Layout.propTypes = {
	children: PropTypes.object
};

export default Layout;
