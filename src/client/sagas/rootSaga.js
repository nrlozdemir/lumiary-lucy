import { all, fork } from "redux-saga/effects";
import library from "./Library";

export default function* rootSaga() {
	yield all([fork(library)]);
}
