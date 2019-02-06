import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";

import rootReducer from "Reducers/rootReducer";
import rootSaga from "Sagas/rootSaga";
import history from "./history";

const composeEnhancers =
	process.env.NODE_ENV === "production"
		? compose
		: typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const sagaMiddleware = createSagaMiddleware({
	...(typeof window === "object" && process.env.NODE_ENV !== "production"
		? {
				sagaMonitor: window["__SAGA_MONITOR_EXTENSION__"]
		  }
		: {})
});

const store = function configureStore() {
	const enhancer = composeEnhancers(
		applyMiddleware(sagaMiddleware),
		applyMiddleware(routerMiddleware(history))
	);
	const store = createStore(rootReducer(history), enhancer);
	sagaMiddleware.run(rootSaga);
	return store;
};

export default store();
