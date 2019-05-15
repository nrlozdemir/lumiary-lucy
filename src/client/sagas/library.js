import qs from 'qs'
import axios from 'axios'
import { ajax } from 'Utils/api'
import { sortVideos } from 'Utils/sort-videos'
import libraryMockData from 'Api/mocks/libraryMock.json'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { types, actions, makeSelectVideoFilters } from 'Reducers/library'

const RESOURCE = '/brand/d65aa957-d094-4cf3-8d37-dafe50e752ea'

function getLibraryApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => libraryMockData)
}

function getLibraryDataApi(vals) {
  return ajax({
    url: RESOURCE,
    method: 'GET',
    params: qs.stringify(vals),
  }).then((response) => {
    if (response.error) {
      throw response.error
    }
    return response.data
  })
}

function* getVideos() {
  try {
    const payload = yield call(getLibraryDataApi)
    yield put(actions.loadVideosSuccess(payload))
  } catch (err) {
    yield put(actions.loadVideosError(err))
  }
}

function* changeFilter() {
  try {
    const payload = yield call(getLibraryApi)
    const filter = yield select(makeSelectVideoFilters())
    const sorted = sortVideos(payload, filter)

    yield put(actions.loadVideosSuccess(sorted))
  } catch (err) {
    yield put(actions.loadVideosError(err))
  }
}

export default [
  takeLatest(types.LOAD_VIDEOS, getVideos),
  takeLatest(types.CHANGE_FILTER, changeFilter),
]
