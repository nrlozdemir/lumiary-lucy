import { all } from 'redux-saga/effects';

import library from "./Library";
import libraryDetail from "./LibraryDetail";
import quickview from "./Quickview";
import marketview from './marketview';

export default function* rootSaga() {
	yield all([...library, ...libraryDetail, ...quickview, ...marketview]);
}
