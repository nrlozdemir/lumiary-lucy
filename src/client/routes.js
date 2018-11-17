import React from "react";
import { IndexRoute, Route } from "react-router";
import Layout from "./containers/Layout";
import { baseName } from "Utils/globals";

//auth
import { loadState, saveState } from "./utils/persistence";

//routes
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Library from "./containers/Library/Main";
import MarketView from "./containers/MarketView";
import Panoptic from "./containers/Panoptic";

const requireAuth = (nextState, replace) => {
	const state = loadState() || {};
	if (state && state.auth && !state.auth.token) {
		replace("/login");
	}
};

const routes = (
	<Route path={baseName} component={Layout}>
		<IndexRoute getComponent={Home} />
		<Route path="/library/" getComponent={Home} sidebar/>
		<Route path="/library/video/:id" components={Library} sidebar/>
		<Route path="marketview(/:type)" getComponent={ MarketView }  />
		<Route path="panoptic" getComponent={ Panoptic } />
		<Route path="*" components={NotFound}/>
	</Route>
);

export default routes;
