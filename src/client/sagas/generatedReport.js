import { call, put, takeLatest, select } from 'redux-saga/effects'
import axios from 'axios'
import { selectAuthProfile } from 'Reducers/auth'
import { actions, types } from 'Reducers/generatedReport'

import generatedReportMockData from 'Api/mocks/generatedReportMock.json'

import { convertDataIntoDatasets } from 'Utils'

import { getReportDataApi } from 'Utils/api'

import _ from 'lodash'

function getGeneratedReportApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => generatedReportMockData)
}

function* getGeneratedReport() {
  try {
    let payload = yield call(getGeneratedReportApi)
    let shuffleData = payload.colorTempData
    shuffleData = shuffleData.map((data) => {
      data.data.map((item) => {
        item.x = _.random(-50, 50)
        item.y = _.random(-50, 50)
      })
      return data
    })

    const colors = [
      'rgba(82, 146, 229, 0.8)',
      '#acb0be',
      'rgba(133, 103, 240, 0.8)',
      'rgba(81, 173, 192, 0.8)',
    ]
    shuffleData = shuffleData.map((data) => {
      data.data.map((item, i) => {
        item.color = colors[i]
      })
      return data
    })

    payload.colorTempData = shuffleData

    yield put(actions.loadGeneratedReportSuccess(payload))
  } catch (err) {
    yield put(actions.loadGeneratedReportError(err))
  }
}

function* getPacingCardData({ data: { reportId } }) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const options = {
      reportId,
      metric: 'views',
      dateRange: '24hours',
      platform: 'all',
      property: ['pacing'],
      dateBucket: 'none',
      display: 'percentage',
      brands: [brand.uuid],
    }

    const stadiumData = yield call(getReportDataApi, options)
    const horizontalStackedBarData = yield call(getReportDataApi, {
      ...options,
      proportionOf: 'format',
    })

    if (
      !!stadiumData.data &&
      !!stadiumData.data[brand.name] &&
      !!stadiumData.data[brand.name].pacing &&
      !!horizontalStackedBarData.data &&
      !!horizontalStackedBarData.data[brand.name] &&
      !!horizontalStackedBarData.data[brand.name].pacing
    ) {
      yield put(
        actions.getPacingCardDataSuccess({
          stadiumData: convertDataIntoDatasets(stadiumData, options),
          horizontalStackedBarData: convertDataIntoDatasets(
            horizontalStackedBarData,
            {
              ...options,
              proportionOf: 'format',
            }
          ),
        })
      )
    } else {
      yield put(
        actions.getPacingCardDataError('Error fetching Pacing Card data')
      )
    }
  } catch (err) {
    console.log(err)
    yield put(actions.getPacingCardDataError(err))
  }
}

function* getCompetitorTopVideos({ data: { metric } }) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const options = {
      metric,
      dateRange: '24hours',
      property: ['resolution'],
      dateBucket: 'none',
      display: 'percentage',
      brands: [brand.uuid],
    }

    const [facebook, instagram, twitter, youtube] = yield all([
      call(getReportDataApi, { ...options, platform: 'facebook' }),
      call(getReportDataApi, { ...options, platform: 'instagram' }),
      call(getReportDataApi, { ...options, platform: 'twitter' }),
      call(getReportDataApi, { ...options, platform: 'youtube' }),
    ])

    yield put(
      actions.getCompetitorTopVideosSuccess(
        convertMultiRequestDataIntoDatasets(
          {
            facebook,
            instagram,
            twitter,
            youtube,
          },
          options
        )
      )
    )
  } catch (error) {
    yield put(actions.getCompetitorTopVideosFailure(error))
  }
}

export default [
  takeLatest(types.LOAD_GENERATED_REPORT, getGeneratedReport),
  takeLatest(types.GET_PACING_CARD_DATA, getPacingCardData),
  takeLatest(types.GET_COMPETITOR_TOP_VIDEOS_REQUEST, getCompetitorTopVideos),
]
