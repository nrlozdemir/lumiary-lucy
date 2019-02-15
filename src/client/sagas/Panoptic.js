import { call, put, takeLatest, all } from "redux-saga/effects";
import { actions, types } from "Reducers/Panoptic";
import { getPanopticData } from "Api/panoptic";

function* getData() {
	try{
		const payload = yield call(getPanopticData);
		yield put(actions.getDataSuccess(payload));
	}catch (err){
		yield put(actions.getDataError(err))
	}
}

export default [takeLatest(types.GET_DATA, getData)];
