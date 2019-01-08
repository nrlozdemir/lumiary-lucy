import React from "react";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./App.scss";

import Routes from "./routes";
import store from "./configureStore";

const App = () => (
	<Provider store={store}>
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	</Provider>
);

export default hot(module)(App);
