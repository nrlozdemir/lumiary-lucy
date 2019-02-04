import { all } from "redux-saga/effects";

import library from "./Library";
import libraryDetail from "./LibraryDetail";

export default function* rootSaga() {
  yield all([...library, ...libraryDetail]);
}
