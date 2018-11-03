import "babel-polyfill";
import "isomorphic-fetch";
import React from "react";
import { match, browserHistory } from "react-router";
import { useBasename } from "history";
import { AppContainer } from "react-hot-loader";
import ReactDOM from "react-dom";
import routes from "./routes";
import store from "./configureStore";
import { persistStore, storages } from "redux-persist";
import Root from "./root";
import throttle from "lodash/throttle";
import { loadState, saveState } from "./utils/persistence";

import "./scss/app.scss";
import "./scss/helpers.scss";

if (typeof window === "undefined") {
	global.window = new Object();
}

const persistedState = loadState() ? loadState() : window.__INITIAL_STATE__;

store.subscribe(
	throttle(() => {
		saveState({
			user: store.getState().user,
			app: store.getState().app,
			auth: store.getState().auth,
			signup: store.getState().signup,
			buyer: store.getState().buyer,
			brand: store.getState().brand,
			project: store.getState().project,
			home: store.getState().home,
			creator: store.getState().creator,
			explore: store.getState().explore,
			social: store.getState().social,
			cart: store.getState().cart
		});
	}, 1000)
);

const render = () => {
	match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
		ReactDOM.render(
			<AppContainer warnings={false}>
				<Root routes={routes} store={store} history={browserHistory} {...renderProps} />
			</AppContainer>,
			document.getElementById("app")
		);
	});
};
persistStore(
	store,
	{
		whitelist: [
			"app",
			"auth",
			"brand",
			"buyer",
			"signup",
			"user",
			"project",
			"home",
			"creator",
			"explore",
			"social",
			"cart"
		],
		storage: storages.localStorage
	},
	() => render()
);

if (module.hot) {
	module.hot.accept();
}
