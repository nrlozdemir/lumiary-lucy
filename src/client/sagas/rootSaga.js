import { all, fork } from "redux-saga/effects";
import library from "./Library";
import libraryDetail from "./LibraryDetail";
import quickview from "./Quickview";

export default function* rootSaga() {
  yield all([...library, ...libraryDetail, ...quickview]);
}
