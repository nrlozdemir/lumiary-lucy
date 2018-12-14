import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { DragDropContext } from "react-dnd";

//import Script from 'react-load-script'
import style from "../components/Layout/styles.scss";
import layoutStyle from "../components/Layout/layout.scss";
import helpers from "../scss/helpers.scss";
import { Header } from "../components/Layout";
import Aside from "../components/Aside";

const Layout = ({ children, main, router }) => {
  const hasSidebar = children && children.props.route.sidebar || false

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
        hasSidebar ?
          <div className={helpers.marginTop5}>
            <div className={layoutStyle.aside}>
              <Aside router={router} />
            </div>
            <div className={layoutStyle.mainSide}>
              {children}
              {main}
            </div>
          </div> :
          <div className={layoutStyle.fullWidth}>
            {children}
            {main}
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

export default DragDropContext(window.ReactDnDHTML5Backend)(Layout);
