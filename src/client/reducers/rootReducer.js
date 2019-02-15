import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import Library from "./library";
import Quickview from "./Quickview";
import Marketview from "./marketview";
import Panoptic from "./Panoptic";
import LibraryDetail from "./libraryDetail";
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
