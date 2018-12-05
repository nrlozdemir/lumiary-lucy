import React from "react";
import { IndexRoute, Route } from "react-router";
import Layout from "./containers/Layout";
import { baseName } from "Utils/globals";

//auth
import { loadState, saveState } from "./utils/persistence";

//routes
import NotFound from "./containers/NotFound";
import Library from "./containers/Library";
import MarketView from "./containers/MarketView";
import Panoptic from "./containers/Panoptic";
import Quickview from "./containers/Quickview";

const requireAuth = (nextState, replace) => {
	const state = loadState() || {};
	if (state && state.auth && !state.auth.token) {
		replace("/login");
	}
};

const routes = (
	<Route path={baseName} component={Layout}>
		<IndexRoute getComponent={Library} sidebar />
		<Route path="library(/video/:id(/:tab))" getComponent={Library} sidebar />
		<Route path="marketview(/:type(/:tab))" getComponent={MarketView} />
		<Route path="panoptic" getComponent={Panoptic} />
		<Route path="quickview" getComponent={Quickview} />
		<Route path="*" components={NotFound} />
	</Route>
);

export default routes;
