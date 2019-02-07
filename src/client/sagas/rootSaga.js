import { all, fork } from "redux-saga/effects";
import library from "./Library";
import panoptic from "./Panoptic";

export default function* rootSaga() {
	yield all([fork(library), fork(panoptic)]);
}
