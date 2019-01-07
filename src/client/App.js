import React from "react";
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

export default App;
