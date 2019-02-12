import { all } from "redux-saga/effects";

import library from "./Library";
import panoptic from "./Panoptic";
import libraryDetail from "./LibraryDetail";
import quickview from "./Quickview";

export default function* rootSaga() {
	yield all([...library, ...libraryDetail, ...quickview, ...panoptic]);
}
