import React from "react";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import "./App.scss";

import history from "./history";
import Routes from "./Routes";
import store from "./configureStore";

const App = () => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Routes />
		</ConnectedRouter>
	</Provider>
);

export default hot(module)(App);
