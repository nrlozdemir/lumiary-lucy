import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from 'axios';
import { actions, types } from "Reducers/panoptic";
import panopticMockData from 'Api/mocks/panopticMock.json';

function getPanopticDataApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
  .then(res => panopticMockData)
}

function* getData() {
	try{
    const payload = yield call(getPanopticDataApi);
		yield put(actions.getDataSuccess(payload));
	}catch (err){
		yield put(actions.getDataError(err))
	}
}

export default [takeLatest(types.GET_DATA, getData)];
