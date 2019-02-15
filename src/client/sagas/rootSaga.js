import { all } from 'redux-saga/effects';

import library from "./library";
import libraryDetail from "./libraryDetail";
import panoptic from "./Panoptic";
import quickview from "./quickview";
import marketview from './marketview';

export default function* rootSaga() {
	yield all([...library, ...libraryDetail, ...quickview, ...panoptic, ...marketview]);
}
