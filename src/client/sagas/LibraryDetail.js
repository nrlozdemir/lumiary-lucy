import { takeLatest, call, put, select } from "redux-saga/effects";

import { actionTypes, actions } from "Reducers/LibraryDetail";
import { getLibraryDetailApi } from "Api/LibraryDetail";

function* getLibraryDetail({ payload: { LibraryDetailId } }) {
	try {
		const payload = yield call(getLibraryDetailApi, {
			LibraryDetailId
		});

		yield put(actions.getLibraryDetailSuccess(payload));
	} catch (error) {
		yield put(actions.getLibraryDetailFailure({ error }));
	}
}

export default [
	takeLatest(actionTypes.GET_LIBRARY_DETAIL_REQUEST, getLibraryDetail)
];
