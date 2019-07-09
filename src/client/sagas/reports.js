import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios'
import { push } from 'connected-react-router'
import { types, actions } from 'Reducers/reports'

import querystring from 'querystring'

import {
  convertDataIntoDatasets,
  radarChartCalculate,
  compareSharesData,
} from 'Utils/datasets'

import { getDataFromApi } from 'Utils/api'
import { selectAuthProfile } from 'Reducers/auth'

function* getReports({ payload: { value: filterValue } = {} }) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const response = yield call(
      getDataFromApi,
      undefined,
      `/user/${brand.uuid}/report`,
      'GET'
    )
    if (!!response) {
      const compare =
        !!response.compare &&
        response.compare.map((item) => {
          return { ...item, category: 'Compare Brands' }
        })
      const insights =
        !!response.insights &&
        response.insights.map((item) => {
          return { ...item, category: 'Brands Insights' }
        })
      let values

      switch (filterValue) {
        case 'insights':
          values = insights
          break
        case 'compare':
          values = compare
          break
        default:
          values = [...compare, ...insights]
      }

      yield put(actions.loadReportsSuccess(values))
    }
  } catch (err) {
    console.log('err', err)
    yield put(actions.loadReportsError(err.message))
  }
}

function* brandInsightSubmit({ payload: { params, onlySave } }) {
  try {
    const {
      title,
      engagamentByPlatform,
      social: socialParam,
      engagement: engagementParam,
      brand: { value: brand },
      date: { value: date },
    } = params

    const [socialSplit, engagementSplit] = engagamentByPlatform
      ? engagamentByPlatform.value.split('|')
      : [null, null]

    let social = socialSplit ? socialSplit : socialParam.value
    let engagement = engagementSplit ? engagementSplit : engagementParam.value

    const saved =
      params && params.saved && params.saved.value ? params.saved.value : false
    const report_uuid = params && params.report_uuid

    const parameters = {
      brand,
      brands: [brand],
      social,
      engagement,
      date,
      title,
      saved,
    }

    yield put(actions.brandInsightFormSubmitSuccess(parameters))
    if (!!onlySave) {
      yield put(
        push(
          `/reports/brand-insight?date=${date}&engagement=${engagement}&title=${title}&social=${social}&brand=${brand}&saved=${saved}${
            report_uuid ? `&report_uuid=${report_uuid}` : ''
          }`
        )
      )
    }
  } catch (err) {
    console.log('err', err)
    yield put(actions.brandInsightFormSubmitError(err))
  }
}

function* compareBrandSubmit({ payload: { params, onlySave } }) {
  try {
    const { saved = false, title, ...brands } = params
    const filteredBrands = Object.keys(brands).filter((brand) => brands[brand])

    const parameters = {
      saved,
      title,
      brands: filteredBrands,
    }

    yield put(actions.compareBrandFormSubmitSuccess(parameters))
    if (!!onlySave && filteredBrands[0] && filteredBrands[1]) {
      yield put(
        push(
          `/reports/compare-brands?title=${title}&brand_one_uuid=${
            filteredBrands[0]
          }&brand_two_uuid=${filteredBrands[1]}&saved=${saved}`
        )
      )
    } else {
      throw 'Error save form compare brand'
    }
  } catch (err) {
    console.log('err', err)
    yield put(actions.compareBrandFormSubmitError(err))
  }
}

function* predefinedReportRequest({ payload }) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const url = `/brand/${brand.uuid}/predef/${payload}`

    const response = yield call(getDataFromApi, undefined, url, 'GET')

    yield put(actions.predefinedReportRequestSuccess(response))
  } catch (err) {
    yield put(actions.predefinedReportRequestError(err))
  }
}

function* deleteReport({ payload: { id, isGetAllReports } }) {
  try {
    const {
      brand: { uuid },
    } = yield select(selectAuthProfile)

    const response = yield call(
      getDataFromApi,
      undefined,
      `/user/${uuid}/report/${id}`,
      'DELETE'
    )

    if (!!response) {
      yield put(actions.loadDeleteReportSuccess(response))
      yield put({
        type: types.CREATED_REPORT_CONTROL,
        payload: {
          isSaved: false,
          uuid: id,
        },
      })
      if (isGetAllReports) yield call(getReports) // get all reports if if you want after the deleted a report
    } else {
      throw 'Error deleting a report on report page'
    }
  } catch (err) {
    console.log('err', err)
    yield put(actions.loadDeleteReportError(err))
  }
}

function* getPredefinedReportChartRequest({ payload }) {
  try {
    console.log('predefined chart data request', payload)
    yield put({
      type: types.PREDEFINED_REPORT_CHART_REQUEST_SUCCESS,
      payload: {},
    })
  } catch (err) {
    console.log(err)
    yield put({
      type: types.PREDEFINED_REPORT_CHART_REQUEST_ERROR,
      payload: err.message,
    })
  }
}

function* getPredefinedReports() {
  try {
    const { brand } = yield select(selectAuthProfile)

    const response = yield call(
      getDataFromApi,
      undefined,
      `/brand/${brand.uuid}/predef`,
      'GET'
    )

    if (!!response) {
      yield put({
        type: types.GET_PREDEFINED_REPORTS_REQUEST_SUCCESS,
        payload: response,
      })
    }
  } catch (err) {
    console.log(err)
    yield put({
      type: types.GET_PREDEFINED_REPORTS_REQUEST_ERROR,
      payload: err.message,
    })
  }
}

function* getContentVitalityScoreData({ payload = {} }) {
  const { dateRange, platform, report = {} } = payload
  const { brands = [] } = report
  try {
    const payload = yield call(
      getDataFromApi,
      {},
      `/report/compare/brands?${querystring.stringify({
        brands: brands,
        property: 'cvScore',
        mode: 'sumVideos',
        daterange: dateRange,
        platform: platform,
      })}`,
      'GET'
    )

    yield put(actions.getContentVitalityScoreDataSuccess(payload))
  } catch (err) {
    console.log(err)
    yield put(actions.getContentVitalityScoreDataError(err))
  }
}

function* getVideoComparisonData({ data: { dateRange, report } }) {
  try {
    const profile = yield select(selectAuthProfile)
    // const competitors = getBrandAndCompetitors(profile)

    // const filteredCompetitors = getFilteredCompetitors(competitors, report)

    const parameters = {
      dateRange,
      metric: 'views',
      property: ['format'],
      dateBucket: 'none',
      brands: [...report.brands],
      platform: 'all',
      limit: 4,
    }

    const payload = yield call(getDataFromApi, parameters, '/report')

    if (!!payload && !!payload.data) {
      const legend = Object.keys(payload.data).map((b, idx) => ({
        label: b,
        color: idx === 1 ? 'coral-pink' : 'cool-blue',
      }))
      yield put(
        actions.getVideoComparisonDataSuccess({
          legend,
          ...convertDataIntoDatasets(payload, parameters, {
            compareBrands: true,
          }),
        })
      )
    } else {
      throw new Error('Compare Brands getVideoComparisonDataError')
    }
  } catch (err) {
    yield put(actions.getVideoComparisonDataError(err))
  }
}

function* getPerformanceComparisonData({
  data: { metric, property, report, dateRange = '3months' },
}) {
  try {
    const profile = yield select(selectAuthProfile)
    // const competitors = getBrandAndCompetitors(profile)

    // const filteredCompetitors = getFilteredCompetitors(competitors, report)

    const parameters = {
      metric,
      dateRange,
      property: [property],
      dateBucket: 'none',
      brands: [...report.brands],
      platform: 'all',
    }

    if (property === 'format') {
      options.limit = 4
    }

    const payload = yield call(getDataFromApi, parameters, '/report')

    if (!!payload && !!payload.data) {
      const legend = Object.keys(payload.data).map((b, idx) => ({
        label: b,
        color: idx === 1 ? 'coral-pink' : 'cool-blue',
      }))
      yield put(
        actions.getPerformanceComparisonDataSuccess({
          legend,
          ...convertDataIntoDatasets(payload, parameters, {
            compareBrands: true,
          }),
        })
      )
    } else {
      throw new Error('Compare Brands getPerformanceComparisonDataError')
    }
  } catch (err) {
    yield put(actions.getPerformanceComparisonDataError(err))
  }
}

function* getColorComparisonData({ data: { metric, dateRange, report } }) {
  try {
    const profile = yield select(selectAuthProfile)
    // const competitors = getBrandAndCompetitors(profile)

    // const filteredCompetitors = getFilteredCompetitors(competitors, report)

    const parameters = {
      dateRange,
      metric,
      platform: 'all',
      property: ['color'],
      dateBucket: 'none',
    }

    if (!!report && !!report.brands && !!report.brands.length) {
      // faster to split it up
      const [brand1, brand2] = yield all([
        call(
          getDataFromApi,
          { ...parameters, brands: report.brands[0] },
          '/report'
        ),
        call(
          getDataFromApi,
          { ...parameters, brands: report.brands[1] },
          '/report'
        ),
      ])

      const payload = { data: { ...brand1.data, ...brand2.data } }

      yield put(
        actions.getColorComparisonDataSuccess(
          radarChartCalculate(compareSharesData(payload, parameters))
        )
      )
    } else {
      throw new Error('CompareBrands Error Fetching Color Comparison Data')
    }
  } catch (err) {
    console.log('err', err)
    yield put(actions.getColorComparisonDataError(err))
  }
}

export default [
  takeLatest(types.LOAD_REPORTS, getReports),
  takeLatest(types.BRAND_INSIGHT_REQUEST, brandInsightSubmit),
  takeLatest(types.COMPARE_BRAND_REQUEST, compareBrandSubmit),
  takeLatest(types.PREDEFINED_REPORT_REQUEST, predefinedReportRequest),
  takeLatest(types.DELETE_REPORT, deleteReport),
  takeLatest(
    types.GET_CONTENT_VITALITY_SCORE_DATA,
    getContentVitalityScoreData
  ),
  takeLatest(types.LOAD_VIDEO_COMPARISON_DATA, getVideoComparisonData),
  takeLatest(
    types.LOAD_PERFORMANCE_COMPARISON_DATA,
    getPerformanceComparisonData
  ),
  takeLatest(types.LOAD_COLOR_COMPARISON_DATA, getColorComparisonData),
  takeLatest(
    types.PREDEFINED_REPORT_CHART_REQUEST,
    getPredefinedReportChartRequest
  ),
  takeLatest(types.GET_PREDEFINED_REPORTS_REQUEST, getPredefinedReports),
]
