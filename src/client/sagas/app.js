import qs from 'qs'
import { types, getGeoposition, getConfig } from 'Reducers/app'
import { delay } from 'redux-saga'
import { call, fork, take, put, all, cancel, cancelled, takeEvery, select, takeLatest } from 'redux-saga/effects'
import { handleResponse } from 'Utils/api'
import { isEmpty } from 'Utils'
import { API_ROOT, API_VERSION } from 'Utils/globals'

const MAPS =  'https://maps.googleapis.com/maps/api/geocode/json?'
const GEOLOC = 'https://www.googleapis.com/geolocation/v1/geolocate?'
const GOOGLE_KEY = 'AIzaSyBBu_35ITtT--2iJ15oXKuWuaRBIAlZHsw'
const CONFIG = '/config'

function fetchConfig(){
  return fetch(`${API_ROOT}/${API_VERSION}${CONFIG}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(handleResponse)
  .then(json => json)
  .catch((error) => { throw error })
}

function* getAppConfig(){
  while(true) {
    try {
      let conf = yield select(getConfig)
      if(isEmpty(conf)){
        yield take(types.REQUEST_CONFIG)
        const config = yield call(fetchConfig)
        yield put({ type: types.RECEIVE_CONFIG, payload: config })
        conf = config
      }
    } catch(e) {
      yield put({ type: types.RECEIVE_CONFIG_ERR, message: e.message })
    }
  }
}

function fetchGeolocation(){
  return fetch(`${GEOLOC}key=${GOOGLE_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(handleResponse)
  .then(json => json)
  .catch((error) => { throw error })
}

function fetchLocation(lat, lng){
  return fetch(`${MAPS}latlng=${lat},${lng}&sensor=true&key=${GOOGLE_KEY}`)
  .then(handleResponse)
  .then(json => json)
  .catch((err) => { throw err })
}

function* getUserLocation() {
  while(true) {
    try{
      let pos = yield select(getGeoposition)

      if(!pos.success) {
        yield take(types.REQUEST_POSITION)
        const position = yield call(fetchGeolocation)
        yield put({ type: types.RECEIVE_POSITION, payload: position.location })
        const address = yield call(fetchLocation, position.location.lat, position.location.lng)
        yield put({ type: types.RECEIVE_ADDRESS, payload: address })
      }

    } catch(e) {
      yield put({ type: 'app err', message: e.message })
    }
  }
}

export function* appFlow(action) {
  try{
    yield fork(getUserLocation)
    yield fork(getAppConfig)
  } catch(e) {
    yield put({ type: 'app error', message: e.message })
  }
}
