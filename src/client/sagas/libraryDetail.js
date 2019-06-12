import { takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios'
import { ajax } from 'Utils/api'

import {
  types,
  actions,
  makeSelectSelectedVideoID,
} from 'Reducers/libraryDetail'
import mock from 'Api/mocks/libraryMock.json'
import { findIdDetail, getDataFromApi, buildApiUrl } from 'Utils/api'
import {
  convertDataIntoDatasets,
  getMaximumValueIndexFromArray,
  convertColorTempToDatasets,
  parseAverage,
} from 'Utils/'
import { selectAuthProfile } from 'Reducers/auth'
import { chartColors } from 'Utils/globals'

const RESOURCE = '/brand/d65aa957-d094-4cf3-8d37-dafe50e752ea'

function getOneVideo({ payload }) {
  return ajax({
    url: `${RESOURCE}/video/${payload}`,
    method: 'GET',
  }).then((response) => {
    if (response.error) {
      throw response.error
    }
    return response.data
  })
}

function getBarChartApi({ LibraryDetailId }) {
  //this will use ajax function in utils/api when real data is provided
  return axios
    .get('/')
    .then((res) => findIdDetail(mock, LibraryDetailId, 'HeaderBarChartMock'))
}

function getColorTempApi({ LibraryDetailId }) {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => findIdDetail(mock, 1, 'ColorTempMock'))
}

function getShotByShotApi({ LibraryDetailId }) {
  const URL = '/brand/d65aa957-d094-4cf3-8d37-dafe50e752ea/video/2203807d-50e0-4c4f-8290-08b7de4ce1bf/shots'

  return ajax({
    url: URL,
    method: 'GET',
  }).then((response) => {
    if (response.error) {
      throw response.error
    }
    return response.data
  })
}

function getShotInfoRequestApi({ LibraryDetailId }) {
  const URL = '/brand/d65aa957-d094-4cf3-8d37-dafe50e752ea/video/2203807d-50e0-4c4f-8290-08b7de4ce1bf/shots/1'
  const FRAMES_INFO = '/brand/6421cdac-d5eb-4427-a267-b9be2e232177/video/e2843ddb-4ba1-4062-acd9-2ffbe302a183/shots/0'

  return ajax({
    url: URL,
    method: 'GET',
  }).then((response) => {
    if (response.error) {
      throw response.error
    }
    // get frames
    return ajax({
      url: FRAMES_INFO,
      method: 'GET',
    }).then((framesResponse) => {
      if (framesResponse.error) {
        throw framesResponse.error
      }
      response.data.shot.frames = framesResponse.data.shot.frames
      return response.data
    })
  })
}

function* getBarChart({ payload: { LibraryDetailId } }) {
  try {
    const payload = yield call(getBarChartApi, {
      LibraryDetailId,
    })
    yield put(actions.getBarChartSuccess(payload))
  } catch (error) {
    yield put(actions.getBarChartFailure({ error }))
  }
}

function* getDoughnutChart({ payload: { LibraryDetailId, themeColors } }) {
  try {
    const expectedValues = [
      { key: 'frameRate', title: 'Frame Rate' },
      { key: 'pacing', title: 'Pacing' },
      { key: 'duration', title: 'Duration' },
      { key: 'aspectRatio', title: 'Aspect Ratio' },
    ]
    const { brand } = yield select(selectAuthProfile)

    const parameters = {
      brands: [brand.uuid],
      dateRange: '3months',
      metric: 'views',
      platform: 'all',
      dateBucket: 'none',
      display: 'percentage',
      dateBucket: 'none',
      url: '/report',
    }
    const payloads = yield expectedValues.map((item) =>
      call(getDataFromApi, {
        ...parameters,
        property: [item.key],
      })
    )
    const createCustomBackground = (data) => {
      return Object.values(data).map((item, idx) => {
        if (Object.values(data).includes(100)) {
          return '#2FD7C4'
        }
        return idx === getMaximumValueIndexFromArray(data)
          ? '#2FD7C4'
          : themeColors.textColor
      })
    }
    const val = expectedValues.map((payload, idx) => ({
      ...payload,
      doughnutChartValues: convertDataIntoDatasets(
        payloads[idx],
        {
          ...parameters,
          property: [payload.key],
        },
        {
          singleDataset: true,
          backgroundColor: createCustomBackground(
            payloads[idx].data[Object.keys(payloads[idx].data)[0]][payload.key]
          ),
        }
      ),
    }))
    yield put(actions.getDoughnutChartSuccess(val))
  } catch (error) {
    yield put(actions.getDoughnutChartFailure({ error }))
  }
}

function* getColorTemperatureData({
  payload: { videoId, daterange = 'week' },
}) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const options = {
      daterange,
      videoUuid: videoId,
      mode: 'industry',
    }

    const response = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/brand/${brand.uuid}/compare`, options),
      'GET'
    )

    if (!!response && !!response.sentiments) {
      const { data: convertedData } = convertColorTempToDatasets(response)

      yield put({
        type: types.GET_COLOR_TEMP_SUCCESS,
        payload: convertedData,
      })
    } else {
      throw 'Error fetching Library/Detail ColorTemperature'
    }
  } catch (err) {
    yield put(actions.getColorTempFailure(err))
  }
}

function* getShotByShot({ payload: { LibraryDetailId } }) {
  try {
    let payload = yield call(getShotByShotApi, {
      LibraryDetailId,
    })

    Object.values(payload.video.shots).map((el, i) => {
      const randomImage = Math.floor(Math.random(1) * Math.floor(30))
      payload.video.shots[i].image = `https://picsum.photos/id/${randomImage}/320/320`
    })

    yield put(actions.getShotByShotSuccess(payload))
  } catch (error) {
    yield put(actions.getShotByShotFailure({ error }))
  }
}

function* getShotInfoRequest({ ShotId }) {
  try {
    const payload = yield call(getShotInfoRequestApi, {
      ShotId,
    })
    yield put(actions.getShotInfoSuccess(payload))
  } catch (error) {
    yield put(actions.getShotInfoFailure({ error }))
  }
}

function* getSelectedVideo({ payload }) {
  try {
    const data = yield call(getOneVideo, {
      payload,
    })
    yield put(actions.getSelectedVideoSuccess(data.video))
  } catch (error) {
    yield put(actions.getSelectedVideoFailure({ error }))
  }
}

function* getVideoAverage({ id }) {
  try {
    
    const { brand } = yield select(selectAuthProfile)
    const payload = yield call(getDataFromApi, {
      url: `/brand/${brand.uuid}/video/${id}/metrics`,
      requestType: 'GET',
    })
    
    /*
    const payload = {
      "video": {
        "likes.value": 393,
        "views.value": 38393,
        "comments.value": 57,
        "shares.value": 91,
        "like.diffFromLibrary": -99.51689033025177,
        "view.diffFromLibrary": -95.90291929996458,
        "comment.diffFromLibrary": -96.92664600798369,
        "share.diffFromLibrary": -86.5427255985267
      },
      "like.LibraryAverage": "81347.988792029888",
      "like.LibraryMax": 661051,
      "view.LibraryAverage": "937081.859277708593",
      "view.LibraryMax": 3955345,
      "comment.LibraryAverage": "1854.6513075965130760",
      "comment.LibraryMax": 32249,
      "share.LibraryAverage": "676.2141967621419676",
      "share.LibraryMax": 61338
    }
    */

    yield put(actions.getSelectedVideoAverageSuccess(parseAverage(payload)))
    //yield put(actions.getSelectedVideoAverageSuccess(payload))
  } catch (error) {
    console.log('error', error)
    yield put(actions.getSelectedVideoAverageFailure({ error }))
  }
}

export default [
  takeLatest(types.GET_BAR_CHART_REQUEST, getBarChart),
  takeLatest(types.GET_DOUGHNUT_CHART_REQUEST, getDoughnutChart),
  takeLatest(types.GET_COLOR_TEMP_REQUEST, getColorTemperatureData),
  takeLatest(types.GET_SHOT_BY_SHOT_REQUEST, getShotByShot),
  takeLatest(types.GET_SELECTED_VIDEO_REQUEST, getSelectedVideo),
  takeLatest(types.GET_SHOT_INFO_REQUEST, getShotInfoRequest),
  takeLatest(types.GET_SELECTED_VIDEO_AVERAGE_REQUEST, getVideoAverage),
]
