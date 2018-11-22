import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import app from "./app";
import home from "./home";
import dropzone from "./dropzone";
import library from "./library";

const appReducer = combineReducers({
	app,
	home,
	dropzone,
	library,
	form: formReducer
});

const rootReducer = (state, action) => {
	return appReducer(state, action);
};

export default rootReducer;
