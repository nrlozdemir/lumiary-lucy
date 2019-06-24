import { takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios'
import querystring from 'querystring'

import { types, actions } from 'Reducers/quickview'
import { selectAuthProfile } from 'Reducers/auth'
import { getDataFromApi } from 'Utils/api'

//mocks
import quickviewItemsData from 'Api/mocks/quickviewItemsMock.json'

function* getQuickviewItemsApi({ platform, metric, daterange, uuid, }) {
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
          "slug": "duration",
          "title": "Duration",
          "value": durationsBucketName,
          "percentage": durationsIndustryPercent,
          "text": "{percentage}% of industry videos are {value} sec in length"
        },
        {
          "slug": "pacing",
          "title": "Pacing",
          "value": pacingsBucketName,
          "percentage": pacingsIndustryPercent,
          "text": "{percentage}% of industry videos have <b>{value} {title}</b>"
        },
        {
          "slug": "format",
          "title": "Format",
          "value": formatsBucketName,
          "percentage": formatsIndustryPercent,
          "text": "{percentage}% of industry videos have a <b>{title}</b> of <b>{value}</b>"
        },
        {
          "slug": "dominantColor",
          "title": "Dominant Color",
          "value": colorsBucketName.charAt(0).toUpperCase() + colorsBucketName.slice(1),
          "percentage": colorsIndustryPercent,
          "text": "{percentage}% of industry videos have a <b>{title}</b> of <b>{value}</b>"
        },
        {
          "slug": "predominantTalentAge",
          "title": "Predominant Talent Age",
          "value": "N/A",
          "percentage": 0,
          "text": "{percentage}% of industry videos are <b>{title}</b> of <b>{value}</b>"
        },
        {
          "slug": "predominantTalentGender",
          "title": "Predominant Talent Gender",
          "value": "N/A",
          "percentage": 0,
          "text": "{percentage}% of industry videos are <b>{title}</b> of <b>{value}</b>"
        },
        {
          "slug": "aspectRatio",
          "title": "Aspect Ratio",
          "value": aspectRatiosBucketName,
          "percentage": aspectRatiosIndustryPercent,
          "text": "{percentage}% of industry videos have an <b>{title}</b> of <b>{value}</b>"
        },
        {
          "slug": "resolution",
          "title": "Resolution",
          "value": resolutionsBucketName,
          "percentage": resolutionsIndustryPercent,
          "text": "{percentage}% of industry videos have a <b>{title}</b> of <b>{value}</b>"
        },
        {
          "slug": "frameRate",
          "title": "Frame Rate",
          "value": `${frameRatesBucketName}fps`,
          "percentage": frameRatesIndustryPercent,
          "text": "{percentage}% of industry videos have a <b>{title}</b> of <b>{value}</b>"
        }
      ]
    }

    return maxVideo
  }

  console.log('request', metric, daterange, platform,)
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
        accumulator.differences[platform] = videoInfo
        break
    }

    return accumulator
  }, {
    differences: {}
  })

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
        differencesValues: response.differences[platform],
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
