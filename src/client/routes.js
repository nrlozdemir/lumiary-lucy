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

const requireAuth = (nextState, replace) => {
	const state = loadState() || {};
	if (state && state.auth && !state.auth.token) {
		replace("/login");
	}
};

const routes = (
	<Route path={baseName} component={Layout}>
		<IndexRoute getComponent={Home} />
		<Route path="/library/video/:id" components={Library} />
		<Route path="*" components={NotFound} />
	</Route>
);

export default routes;
