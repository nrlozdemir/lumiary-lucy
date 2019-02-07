import { call, put, takeLatest, all } from "redux-saga/effects";
import { actions, types } from "Reducers/Panoptic";

export function* getData() {
	try{
		const data = {
			//Fill inside
		};
		yield put(actions.getDataSuccess(data));
	}catch (err){
		yield put(actions.getDataError(err))
	}
}

export default function* panopticSaga() {
	yield takeLatest(types.GET_DATA, getData)
}
