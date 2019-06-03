import qs from 'qs'
import axios from 'axios'
import { ajax } from 'Utils/api'
import { sortVideos } from 'Utils/sort-videos'
import libraryMockData from 'Api/mocks/libraryMock.json'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { types, actions, makeSelectVideoFilters } from 'Reducers/library'
import { userUuid } from 'Utils/globals'

const RESOURCE = '/brand'

function getLibraryApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => libraryMockData)
}

function getLibraryDataApi(vals) {
  const { limit, page, body = {} } = vals

  return ajax({
    url: `${RESOURCE}/${userUuid}?limit=${limit}&page=${page}`,
    method: 'POST',
    params: qs.stringify(body),
  }).then((response) => {
    console.log(response.data)
    if (response.error) {
      throw response.error
    }
    return response.data
  })
}

function* getVideos(values) {
  const page = values && values.payload && values.payload.page
  try {
    const filters = yield select(makeSelectVideoFilters())
    const body = getBodyFromFilters(filters)

    const options = {
      limit: 16,
      page: page || 1,
      body,
    }
    const payload = yield call(getLibraryDataApi, options)
    yield put(actions.loadVideosSuccess(payload))
  } catch (err) {
    console.log(err)
    debugger
    yield put(actions.loadVideosError(err))
  }
}

function getBodyFromFilters (filters = {}) {
  return Object.keys(filters).reduce((accumulator, filter) => {
    const thisFilter = filters[filter]
    switch(filter) {
      case 'Search':
        const { value } = thisFilter
        accumulator['term'] = value
      break
    }

    return accumulator
  }, {})
}

function* changeFilter() {
  try {
    // const payload = yield call(getLibraryApi)
    const filters = yield select(makeSelectVideoFilters())
    const body = getBodyFromFilters(filters)

    const options = {
      limit: 16,
      page: 1,
      body,
    }

    const payload = yield call(getLibraryDataApi, options)
    console.log(filters)
    console.log(body)
    console.log(payload)

    yield put(actions.clearAndLoadVideos(payload))

    // yield put(actions.loadVideosSuccess(sorted))
  } catch (err) {
    console.log(err)
    debugger
    // yield put(actions.loadVideosError(err))
  }
}

export default [
  takeLatest(types.LOAD_VIDEOS, getVideos),
  takeLatest(types.CHANGE_FILTER, changeFilter),
]
