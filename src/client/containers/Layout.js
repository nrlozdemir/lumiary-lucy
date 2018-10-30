import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

//import Script from 'react-load-script'
import style from "../components/Layout/styles.scss";
import layoutStyle from "../components/Layout/layout.scss";
import helpers from "../utils/helpers.scss";
import { Header } from "../components/Layout";
import Aside from "../components/Aside";

const Layout = ({ children, main }) => (
	<div style={style} className="layout">
		<Helmet>
			<meta
				name="viewport"
				content="width=device-width,initial-scale=1,shrink-to-fit=no"
			/>
		</Helmet>
		<div className={layoutStyle.headerSide}>
			<Header />
		</div>
		<div className={layoutStyle.bottomBorder} />
		<div className={helpers.marginTop5}>
			<div className={layoutStyle.aside}>
				<Aside />
			</div>
			<div className={layoutStyle.mainSide}>
				{children}
				{main}
			</div>
		</div>
		{/* <Footer /> */}
	</div>
);

Layout.propTypes = {
	children: PropTypes.object,
	main: PropTypes.object
};

export default Layout;
