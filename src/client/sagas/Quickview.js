import { takeLatest, call, put } from "redux-saga/effects";

import { types, actions } from "Reducers/Quickview";
import { getQuickviewItems, getQuickviewPlatformSelected } from "Api/quickview";

function* getQuickviewItemsSaga() {
  try {
    const payload = yield call(getQuickviewItems);
    yield put(actions.getQuickviewItemsSuccess(payload));
  } catch (error) {
    yield put(actions.getQuickviewItemsFailure({ error }));
  }
}
function* getQuickviewSelectedPlatformSaga(id) {
  try {
    const payload = yield call(getQuickviewPlatformSelected, { id });
    yield put(actions.getQuickviewPlatformSelectedSuccess(payload));
  } catch (error) {
    yield put(actions.getQuickviewPlatformSelectedFailure({ error }));
  }
}

export default [
  takeLatest(types.GET_QUICKVIEW_ITEMS_REQUEST, getQuickviewItemsSaga),
  takeLatest(
    types.GET_QUICKVIEW_PLATFORM_SELECTED_REQUEST,
    getQuickviewSelectedPlatformSaga
  )
];
