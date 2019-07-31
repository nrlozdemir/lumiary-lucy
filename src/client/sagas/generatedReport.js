import { call, put, takeLatest, all, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import axios from 'axios'
import { makeSelectAuthProfile } from 'Reducers/auth'
import { actions, types } from 'Reducers/generatedReport'
import { actions as reportsActions } from 'Reducers/reports'
import querystring from 'querystring'

import {
  sortObject,
  getDateBucketFromRange,
  getBrandAndCompetitors,
  getFilteredCompetitors,
} from 'Utils'

import {
  convertDataIntoDatasets,
  convertMultiRequestDataIntoDatasets,
  convertVideoEngagementData,
  convertColorTempToDatasets,
  percentageManipulation,
} from 'Utils/datasets'

import { getDataFromApi, buildApiUrl } from 'Utils/api'
import _ from 'lodash'

function* saveReport({ data }) {
  try {
    const { category } = data
    const {
      brand: { uuid },
    } = yield select(makeSelectAuthProfile())
    if (category === 'Brands Insights') {
      const { brands, social, engagement, date, title, brand } = data

      const parameters = {
        brand_uuid: brand,
        platform: social,
        metric: engagement,
        date_range: date,
        title,
      }

      const response = yield call(
        getDataFromApi,
        parameters,
        `/user/${uuid}/report/?type=insights`,
        'POST'
      )

      if (!!response && !!response.reportUuid) {
        yield put(actions.saveReportSuccess(response))
        yield put(
          reportsActions.createdReportControl({
            isSaved: true,
            uuid: response.reportUuid,
          })
        )
      } else {
        throw new Error('Error Brands Insights save report on saga')
      }
      // yield put(push('/reports'))
    } else if (category === 'Compare Brands') {
      const { title, brands } = data

      const parameters = {
        brand_one_uuid: brands[0],
        brand_two_uuid: brands[1],
        title,
      }

      const response = yield call(
        getDataFromApi,
        parameters,
        `/user/${uuid}/report/?type=compare`,
        'POST'
      )

      if (!!response && !!response.reportUuid) {
        yield put(actions.saveReportSuccess(response))
        yield put(
          reportsActions.createdReportControl({
            isSaved: true,
            uuid: response.reportUuid,
          })
        )
      } else {
        throw new Error('Error Compare Brands save report on saga')
      }
    }
  } catch (err) {
    console.log('err', err)
    yield put(actions.saveReportFailure(err))
  }
}

function* getTopPerformingVideos({ data: { report = {} } }) {
  try {
    const {
      brands = [],
      date: dateRange,
      engagement: metric,
      social: platform,
    } = report

    if (!!brands.length && !!dateRange && !!metric && !!platform) {
      const response = yield call(
        getDataFromApi,
        undefined,
        `/brand/${brands[0]}/topvideos?${querystring.stringify({
          dateRange,
          platform,
          metric,
          brandUuid: brands[0],
        })}`,
        'GET'
      )

      if (!!response && !!response.length) {
        yield put(
          actions.getTopPerformingVideosSuccess(
            percentageManipulation(response)
          )
        )
      } else {
        yield put(actions.getTopPerformingVideosSuccess([]))
      }
    } else {
      throw new Error('Brand Insights Error')
    }
  } catch (err) {
    console.log(err)
    yield put(actions.getTopPerformingVideosFailure(err))
  }
}

function* getVideoReleasesBarChart({ data: { report } }) {
  try {
    const { engagement: metric, date: daterange, social: platform } = report
    const { brand } = yield select(makeSelectAuthProfile())

    const options = {
      metric,
      platform,
      daterange,
      property: 'duration',
      limit: 4,
    }

    const response = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/brand/${brand.uuid}/count`, options),
      'GET'
    )

    const sortedResponse = sortObject(response)

    if (!!sortedResponse) {
      yield put(
        actions.getVideoReleasesBarChartSuccess(
          convertVideoEngagementData(sortedResponse, metric)
        )
      )
    } else {
      throw new Error('Brand Insights Error getVideoReleasesBarChart')
    }
  } catch (err) {
    console.log(err)
    yield put(actions.getVideoReleasesBarChartFailure(err))
  }
}

function* getColorTempData({
  data: {
    report: { brands, date: dateRange },
    colorTemperature,
  },
}) {
  try {
    const { brand } = yield select(makeSelectAuthProfile())

    const response = yield call(
      getDataFromApi,
      {},
      `/brand/${brands[0]}/compare/?daterange=${dateRange}`,
      'GET'
    )

    const {
      labels,
      platforms,
      data: colorTempData,
    } = convertColorTempToDatasets(response, colorTemperature)

    yield put(
      percentageManipulation(
        actions.getColorTempDataSuccess({
          labels,
          platforms,
          data: colorTempData,
        })
      )
    )
  } catch (err) {
    yield put(actions.getColorTempDataFailure(err))
  }
}

function* getFilteringSectionData({ data: { property, report } }) {
  try {
    const profile = yield select(makeSelectAuthProfile())
    const competitors = getBrandAndCompetitors(profile)

    const filteredCompetitors = getFilteredCompetitors(competitors, report)
    const options = {
      dateRange: report.date,
      metric: report.engagement,
      platform: report.social,
      dateBucket: 'none',
      display: 'percentage',
      property: [property],
      url: '/report',
      brands: [...filteredCompetitors],
    }

    const doughnutData = yield call(getDataFromApi, options)

    const dateBucket = getDateBucketFromRange(report.date)

    const stackedChartData =
      dateBucket !== 'none'
        ? yield call(getDataFromApi, {
            ...options,
            dateBucket,
          })
        : { data: {} }

    yield put(
      actions.getFilteringSectionDataSuccess({
        doughnutData: percentageManipulation(
          convertDataIntoDatasets(doughnutData, options, {
            singleDataset: true,
          })
        ),
        stackedChartData:
          (!_.isEmpty(stackedChartData.data) &&
            percentageManipulation(
              convertDataIntoDatasets(
                stackedChartData,
                { ...options, dateBucket },
                { borderWidth: { top: 3, right: 0, bottom: 0, left: 0 } }
              )
            )) ||
          {},
        property: 'duration',
      })
    )
  } catch (err) {
    yield put(
      // empty data
      actions.getFilteringSectionDataSuccess({
        doughnutData: {
          total: 0,
        },
        stackedChartData: {},
      })
    )
    yield put(actions.getFilteringSectionDataFailure(err))
  }
}

function* getPacingCardData({ data: { report } }) {
  try {
    const profile = yield select(makeSelectAuthProfile())
    const competitors = getBrandAndCompetitors(profile)
    const { brand } = report

    const options = {
      metric: report.engagement,
      platform: report.social,
      dateRange: report.date,
      property: ['pacing'],
      dateBucket: 'none',
      display: 'percentage',
      brands: [brand],
    }

    const [stadiumData, horizontalStackedBarData] = yield all([
      call(getDataFromApi, options, '/report'),
      call(
        getDataFromApi,
        {
          ...options,
          proportionOf: 'duration',
          limit: 4,
        },
        '/report'
      ),
    ])

    const brandName =
      (!!stadiumData &&
        !!stadiumData.data &&
        !!Object.keys(stadiumData.data).length &&
        Object.keys(stadiumData.data)[0]) ||
      null

    if (
      !!brandName &&
      !!stadiumData.data &&
      !!stadiumData.data[brandName] &&
      !!stadiumData.data[brandName].pacing &&
      !!horizontalStackedBarData.data &&
      !!horizontalStackedBarData.data[brandName] &&
      !!horizontalStackedBarData.data[brandName].pacing
    ) {
      yield put(
        actions.getPacingCardDataSuccess({
          stadiumData: percentageManipulation(
            convertDataIntoDatasets(stadiumData, options)
          ),
          horizontalStackedBarDataOriginal:
            horizontalStackedBarData.data[brandName].pacing,
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
      throw new Error('Error fetching Pacing Card data')
    }
  } catch (err) {
    yield put(actions.getPacingCardDataFailure(err))
  }
}

function* getCompetitorTopVideos({ data: { property, report } }) {
  try {
    const profile = yield select(makeSelectAuthProfile())
    const competitors = getBrandAndCompetitors(profile)

    const filteredCompetitors = getFilteredCompetitors(competitors, report)

    const options = {
      metric: report.engagement,
      platform: report.social,
      dateRange: report.date,
      property: [property],
      dateBucket: 'none',
      display: 'percentage',
      url: '/report',
      brands: [...filteredCompetitors],
    }

    if (property === 'format') {
      options.limit = 4
    }

    const [facebook, instagram, twitter, youtube] = yield all([
      call(getDataFromApi, { ...options, platform: 'facebook' }),
      call(getDataFromApi, { ...options, platform: 'instagram' }),
      call(getDataFromApi, { ...options, platform: 'twitter' }),
      call(getDataFromApi, { ...options, platform: 'youtube' }),
    ])

    yield put(
      actions.getCompetitorTopVideosSuccess(
        percentageManipulation(
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
    )
  } catch (error) {
    yield put(actions.getCompetitorTopVideosFailure(error))
  }
}

export default [
  takeLatest(types.SAVE_REPORT_REQUEST, saveReport),
  takeLatest(types.GET_PACING_CARD_DATA_REQUEST, getPacingCardData),
  takeLatest(types.GET_COMPETITOR_TOP_VIDEOS_REQUEST, getCompetitorTopVideos),
  takeLatest(types.GET_TOP_PERFORMING_VIDEOS_REQUEST, getTopPerformingVideos),
  takeLatest(
    types.GET_VIDEO_RELEASES_BAR_CHART_REQUEST,
    getVideoReleasesBarChart
  ),
  takeLatest(types.GET_COLOR_TEMP_DATA_REQUEST, getColorTempData),
  takeLatest(types.GET_FILTERING_SECTION_DATA_REQUEST, getFilteringSectionData),
]
