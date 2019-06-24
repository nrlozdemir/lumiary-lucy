import { takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios'
import querystring from 'querystring'

import { types, actions } from 'Reducers/quickview'
import { selectAuthProfile } from 'Reducers/auth'
import { getDataFromApi } from 'Utils/api'

//mocks
import quickviewItemsData from 'Api/mocks/quickviewItemsMock.json'

function* getQuickviewItemsApi({ platform, metric, daterange, uuid, }) {
  //this will use ajax function in utils/api when real data is provided

  // // const platform = 'facebook'
  // const serverData = {
  //   "maxVideo": {
  //     "id": 1130,
  //     "uuid": "13c710aa-1c0b-450a-9fe1-0b4274a83fd4",
  //     "title": "The levels of disrespect...\n\n(via _kennedychandler1/IG)",
  //     "fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/facebook/13c710aa-1c0b-450a-9fe1-0b4274a83fd4/442696289887625.mp4",
  //     "date": "2019-06-04T15:55:13.000Z",
  //     "brand_uuid": "d65aa957-d094-4cf3-8d37-dafe50e752ea",
  //     "platform": null,
  //     "createdAt": "2019-06-04T17:14:42.914Z",
  //     "updatedAt": "2019-06-04T19:41:00.899Z",
  //     "cvScores.value": 15.376738536833,
  //     "aspectRatios.value": "4:5",
  //     "frameRates.value": 30,
  //     "durations.value": 5.933984,
  //     "durations.bucket_name": '0-15',
  //     "pacings.value": 5.9,
  //     "pacings.bucket_name": 'Medium',
  //     "formats.value": "None",
  //     "resolutions.value": "480p"
  //   },
  //   "minVideo": {
  //     "id": 1125,
  //     "uuid": "a9be4618-0296-48c6-849c-de7ac547f992",
  //     "title": "Steph wishes he would've handled things differently",
  //     "fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/facebook/a9be4618-0296-48c6-849c-de7ac547f992/2435667196490605.mp4",
  //     "date": "2019-06-04T16:51:46.000Z",
  //     "brand_uuid": "d65aa957-d094-4cf3-8d37-dafe50e752ea",
  //     "platform": null,
  //     "createdAt": "2019-06-04T17:12:22.854Z",
  //     "updatedAt": "2019-06-04T19:40:58.746Z",
  //     "cvScores.value": 1,
  //     "aspectRatios.value": "1:1",
  //     "frameRates.value": 29.97,
  //     "durations.value": 9.34301,
  //     "durations.bucket_name": '31-60',
  //     "pacings.value": 2.0353685,
  //     "pacings.bucket_name": 'Slowest',
  //     "formats.value": "None",
  //     "resolutions.value": "480p"
  //   },
  //   "differences": {
  //     "duration": 36.48744890565246,
  //     "pacings": 189.87379926534186
  //   }
  // }

  const parseVideoResponse = ({ videoInfo, serverData }) => {
    const { 
      title = '', 
      brand_uuid = '', 
      uuid = '', 
      'cvScores.value':cvScoresValue = '',
      'cvScores.bucket_name':cvScoresBucketName = '',
      'cvScores.industry_percent':cvScoresIndustryPercent = '',
      'durations.value':durationsValue = '',
      'durations.bucket_name':durationsBucketName = '',
      'durations.industry_percent':durationsIndustryPercent = '',
      'pacings.value':pacingsValue = '',
      'pacings.bucket_name':pacingsBucketName = '',
      'pacings.industry_percent':pacingsIndustryPercent = '',
      'formats.value':formatsValue = '',
      'formats.bucket_name':formatsBucketName = '',
      'formats.industry_percent':formatsIndustryPercent = '',
      'colors.value':colorsValue = '',
      'colors.bucket_name':colorsBucketName = '',
      'colors.industry_percent':colorsIndustryPercent = '',
      'aspectRatios.value':aspectRatiosValue = '',
      'aspectRatios.bucket_name':aspectRatiosBucketName = '',
      'aspectRatios.industry_percent':aspectRatiosIndustryPercent = '',
      'resolutions.value':resolutionsValue = '',
      'resolutions.bucket_name':resolutionsBucketName = '',
      'resolutions.industry_percent':resolutionsIndustryPercent = '',
      'frameRates.value':frameRatesValue = '',
      'frameRates.bucket_name':frameRatesBucketName = '',
      'frameRates.industry_percent':frameRatesIndustryPercent = '',
    } = videoInfo

    const maxVideo = {
      video: {
        title: title,
        videoUrl: `https://s3.amazonaws.com/quickframe-media-staging/lumiere/${brand_uuid}/${uuid}.mp4`,
        poster: `https://s3.amazonaws.com/quickframe-media-staging/lumiere/${brand_uuid}/${uuid}.mp4`,
        socialIcon: platform,
        cvScore: cvScoresValue,
      },
      infos: [
        {
          "title": "Duration",
          "value": durationsBucketName,
          "percentage": durationsIndustryPercent,
          "text": "{percentage}% of industry videos are {value} sec in length"
        },
        {
          "title": "Pacing",
          "value": pacingsBucketName,
          "percentage": pacingsIndustryPercent,
          "text": "{percentage}% of industry videos have <b>{value} {title}</b>"
        },
        {
          "title": "Format",
          "value": formatsBucketName,
          "percentage": formatsIndustryPercent,
          "text": "{percentage}% of industry videos have a <b>{title}</b> of <b>{value}</b>"
        },
        {
          "title": "Dominant Color",
          "value": "N/A",
          "percentage": 0,
          "text": "{percentage}% of industry videos have a <b>{title}</b> of <b>{value}</b>"
        },
        {
          "title": "Predominant Talent Age",
          "value": "N/A",
          "percentage": 0,
          "text": "{percentage}% of industry videos are <b>{title}</b> of <b>{value}</b>"
        },
        {
          "title": "Predominant Talent Gender",
          "value": "N/A",
          "percentage": 0,
          "text": "{percentage}% of industry videos are <b>{title}</b> of <b>{value}</b>"
        },
        {
          "title": "Aspect Ratio",
          "value": aspectRatiosBucketName,
          "percentage": aspectRatiosIndustryPercent,
          "text": "{percentage}% of industry videos have an <b>{title}</b> of <b>{value}</b>"
        },
        {
          "title": "Resolution",
          "value": resolutionsBucketName,
          "percentage": resolutionsIndustryPercent,
          "text": "{percentage}% of industry videos have a <b>{title}</b> of <b>{value}</b>"
        },
        {
          "title": "Frame Rate",
          "value": `${frameRatesBucketName}fps`,
          "percentage": frameRatesIndustryPercent,
          "text": "{percentage}% of industry videos have a <b>{title}</b> of <b>{value}</b>"
        }
      ]
    }

    return maxVideo
  }

  const serverData = yield call(
    getDataFromApi,
    {},
    `/quickview?${querystring.stringify({
      metric,
      daterange,
      platform,
    })}`,
    'GET'
  )

  const serverObject = Object.keys(serverData).reduce((accumulator, compareKey) => {
    if(!accumulator[platform]){
      accumulator[platform] = [null, null]
    }
    const videoInfo = serverData[compareKey] || {}

    switch (compareKey) {
      case 'maxVideo':
        accumulator[platform][1] = parseVideoResponse({videoInfo, serverData})
        break

      case 'minVideo':
        accumulator[platform][0] = parseVideoResponse({videoInfo, serverData})
        break

      case 'differences':
        break
    }

    return accumulator
  }, {})

  console.log('serverObject', serverObject)
  console.log('quickviewItemsData', quickviewItemsData)

  return serverObject
}

function* getQuickviewItemsSaga({ payload }) {
  try {
    const { platform = 'facebook', data = {} } = payload
    const { metric = 'views', daterange = 'week' } = data

    const profile = yield select(selectAuthProfile)
    const { brand = {} } = profile
    const { uuid } = brand

    if(!uuid){
      throw new Error('brand uuid must be provided')
    }

    const response = yield call(getQuickviewItemsApi, {
      platform,
      metric,
      daterange,
      uuid,
    })

    yield put({
      type: types.GET_QUICKVIEW_ITEMS_SUCCESS,
      payload: {
        platformsValues: response[platform],
      },
    })
  } catch (error) {
    console.log(error)
    yield put({
      type: types.GET_QUICKVIEW_ITEMS_FAILURE,
      error,
    })
  }
}

export default [
  takeLatest(types.GET_QUICKVIEW_ITEMS_REQUEST, getQuickviewItemsSaga),
]
