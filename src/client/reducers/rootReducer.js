import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import Library from "./Library";
import Quickview from "./Quickview";
import Marketview from "./marketview";
import Panoptic from "./Panoptic";
import LibraryDetail from "./LibraryDetail";
import app from "./app";

const rootReducer = history =>
  combineReducers({
    app,
    Library,
    Quickview,
    Marketview,
    Panoptic,
    LibraryDetail,
    form: formReducer
  });

export default rootReducer;
