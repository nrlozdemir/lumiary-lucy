import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from 'axios';
import { actions, types } from "Reducers/panoptic";
import panopticMockData from 'Api/mocks/panopticMock.json';
import audienceMockData from 'Api/mocks/audienceMock.json';

function getPanopticDataApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
    .then(res => panopticMockData)
}

function getAudienceDataApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
    .then(res => audienceMockData)
}

function* getData() {
  try {
    const payload = yield call(getPanopticDataApi);
    yield put(actions.getDataSuccess(payload));
  } catch (err) {
    yield put(actions.getDataError(err))
  }
}

function* getAudienceData() {
  try {
    const payload = yield call(getAudienceDataApi);
    yield put(actions.getAudienceDataSuccess(payload));
  } catch (err) {
    yield put(actions.getAudienceDataError(err))
  }
}

export default [
  takeLatest(types.GET_DATA, getData),
  takeLatest(types.GET_AUDIENCE_DATA, getAudienceData)
];
