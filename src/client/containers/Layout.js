import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

//import Script from 'react-load-script'
import style from "../components/Layout/styles.scss";
import layoutStyle from "../components/Layout/layout.scss";
import helpers from "../scss/helpers.scss";
import { Header } from "../components/Layout";
import Aside from "../components/Aside";

const Layout = ({ children, main, router }) => {
  const isFullLayout = children && children.props.route.full || false
  
	return (
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
			{
				isFullLayout ?
          <div className={layoutStyle.fullWidth}>
            {children}
            {main}
          </div> :
          <div className={helpers.marginTop5}>
            <div className={layoutStyle.aside}>
              <Aside router={router} />
            </div>
            <div className={layoutStyle.mainSide}>
              {children}
              {main}
            </div>
          </div>
			}
			{/* <Footer /> */}
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.object,
	main: PropTypes.object,
	router: PropTypes.object
};

export default DragDropContext(HTML5Backend)(Layout);
