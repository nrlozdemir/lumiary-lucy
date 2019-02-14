import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
// import PropTypes from "prop-types";

import Library from "Containers/Library";
import Quickview from "Containers/Quickview";
import Panoptic from "Containers/Panoptic";
import Marketview from "Containers/Marketview";
import MarketviewDetail from 'Containers/Marketview/Detail';
import NotFound from "Containers/NotFound";
import LibraryDetail from "Containers/LibraryDetail";
import BuildReport from "Containers/BuildReport";
import Layout from "Containers/Layout";
import Compare from "Containers/Compare";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path="/"
          exact
          render={props => <Layout {...props} component={Library} />}
        />
        <Route
          path="/library"
					exact
          render={props => <Layout {...props} component={Library} />}
        />
        <Route
          path="/library/:videoId/compare"
					exact
          render={props => (
            <Layout {...props} component={Compare} removeNavbar />
          )}
        />
        <Route
          path="/library/build-report/:videoId"
					exact
          render={props => (
            <Layout {...props} component={BuildReport} removeNavbar />
          )}
        />
        <Route
          path="/library/:videoId"
					exact
          render={props => (
            <Layout {...props} component={LibraryDetail} removeNavbar />
          )}
        />
        <Route
          path="/quickview"
					exact
          render={props => <Layout {...props} component={Quickview} />}
        />
        <Route
          path="/panoptic"
					exact
          render={props => <Layout {...props} component={Panoptic} />}
        />
        <Route
          path="/marketview"
					exact
          render={props => <Layout {...props} component={Marketview} />}
        />
        <Route
          path="/marketview/detail"
					exact
          render={props => <Layout {...props} component={MarketviewDetail} />}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

Routes.propTypes = {};

export default withRouter(Routes);
