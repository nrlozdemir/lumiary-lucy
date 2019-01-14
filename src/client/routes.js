import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
// import PropTypes from "prop-types";

import Library from "Containers/Library";
import Quickview from "Containers/Quickview";
import QuickviewDetail from "Containers/QuickviewDetail";
import Panoptic from "Containers/Panoptic";
import Marketview from "Containers/Marketview";
import NotFound from "Containers/NotFound";
import LibraryDetail from "Containers/LibraryDetail";
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
          render={props => (
            <Layout {...props} component={Compare} removeNavbar />
          )}
        />
        <Route
          path="/library/:videoId"
          render={props => (
            <Layout {...props} component={LibraryDetail} removeNavbar />
          )}
        />
        <Route
          path="/quickview/:id/:platform"
          render={props => <Layout {...props} component={QuickviewDetail} />}
        />
        <Route
          path="/quickview"
          render={props => <Layout {...props} component={Quickview} />}
        />

        <Route
          path="/panoptic"
          render={props => <Layout {...props} component={Panoptic} />}
        />
        <Route
          path="/marketview"
          render={props => <Layout {...props} component={Marketview} />}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

Routes.propTypes = {};

export default withRouter(Routes);
