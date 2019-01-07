import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./configureStore";
import Routes from "./routes";
import "./scss/app.scss";
ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	</Provider>,
	document.getElementById("app")
);
