import { all } from 'redux-saga/effects';

import library from "./library";
import libraryDetail from "./libraryDetail";
import quickview from "./Quickview";
import marketview from './marketview';

export default function* rootSaga() {
	yield all([...library, ...libraryDetail, ...quickview, ...marketview]);
}
