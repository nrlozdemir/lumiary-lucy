import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import Library from "./Library";
import Quickview from "./Quickview";
import QuickviewDetail from "./QuickviewDetail";
import Marketview from "./Marketview";
import Panoptic from "./Panoptic";
import LibraryDetail from "./LibraryDetail";
import app from "./app";

const rootReducer = history =>
	combineReducers({
		app,
		Library,
		Quickview,
		QuickviewDetail,
		Marketview,
		Panoptic,
		LibraryDetail,
		form: formReducer
	});

export default rootReducer;
