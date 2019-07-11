import { takeLatest, call, put, select } from 'redux-saga/effects'
import querystring from 'querystring'

import { types } from 'Reducers/quickview'
import { selectAuthProfile } from 'Reducers/auth'
import { getDataFromApi } from 'Utils/api'

import { percentageManipulation } from 'Utils/datasets'

function* getQuickviewItemsApi({
  platform,
  metric,
  dateRange,
  brandUuid,
  competitors = [],
}) {
  const parseVideoResponse = ({ videoInfo, serverData, type }) => {
    const {
      title = '',
      brand_uuid = '',
      uuid = '',
      'cvScores.value': cvScoresValue = '',
      'cvScores.bucket_name': cvScoresBucketName = '',
      'cvScores.industry_percent': cvScoresIndustryPercent = '',
      'durations.value': durationsValue = '',
      'durations.bucket_name': durationsBucketName = '',
      'durations.industry_percent': durationsIndustryPercent = '',
      'pacings.value': pacingsValue = '',
      'pacings.bucket_name': pacingsBucketName = '',
      'pacings.industry_percent': pacingsIndustryPercent = '',
      'formats.value': formatsValue = '',
      'formats.bucket_name': formatsBucketName = '',
      'formats.industry_percent': formatsIndustryPercent = '',
      'colors.value': colorsValue = '',
      'colors.bucket_name': colorsBucketName = '',
      'colors.industry_percent': colorsIndustryPercent = '',
      'aspectRatios.value': aspectRatiosValue = '',
      'aspectRatios.bucket_name': aspectRatiosBucketName = '',
      'aspectRatios.industry_percent': aspectRatiosIndustryPercent = '',
      'resolutions.value': resolutionsValue = '',
      'resolutions.bucket_name': resolutionsBucketName = '',
      'resolutions.industry_percent': resolutionsIndustryPercent = '',
      'frameRates.value': frameRatesValue = '',
      'frameRates.bucket_name': frameRatesBucketName = '',
      'frameRates.industry_percent': frameRatesIndustryPercent = '',
      'genders.value': gendersValue = '',
      'genders.bucket_name': gendersBucketName = '',
      'genders.industry_percent': gendersIndustryPercent = '',
      'ages.value': agesValue = '',
      'ages.bucket_name': agesBucketName = '',
      'ages.industry_percent': agesIndustryPercent = '',
    } = videoInfo

    const performingText =
      type && type === 'maxVideo' ? 'overperforming ' : 'underperforming '

      const maxVideo = {
        video: {
          title: title,
          videoUrl: `https://s3.amazonaws.com/quickframe-media-staging/lumiere/${brand_uuid}/${uuid}.mp4`,
          socialIcon: platform,
          cvScore: cvScoresValue,
        },
        infos: [
          {
            slug: 'duration',
            title: 'Duration',
            value: durationsBucketName,
            percentage: durationsIndustryPercent,
            text: `<b>{percentage}%</b> of ${performingText}industry videos are <b>{value} sec</b> in length`,
          },
          {
            slug: 'pacing',
            title: 'Pacing',
            value: pacingsBucketName,
            percentage: pacingsIndustryPercent,
            text: `<b>{percentage}%</b> of ${performingText}industry videos have <b>{value} {title}</b>`,
          },
          {
            slug: 'format',
            title: 'Format',
            value: formatsBucketName,
            percentage: formatsIndustryPercent,
            text: `<b>{percentage}%</b> of ${performingText}industry videos have a <b>{title}</b> of <b>{value}</b>`,
          },
          {
            slug: 'dominantColor',
            title: 'Dominant Color',
            value:
              colorsBucketName.charAt(0).toUpperCase() +
              colorsBucketName.slice(1),
            percentage: colorsIndustryPercent,
            text: `<b>{percentage}%</b> of ${performingText}industry videos have a <b>{title}</b> of <b>{value}</b>`,
          },
          {
            slug: 'predominantTalentAge',
            title: 'Predominant Talent Age',
            value: agesBucketName,
            percentage: agesIndustryPercent,
            text: `<b>{percentage}%</b> of ${performingText}industry videos are <b>{title}</b> of <b>{value}</b>`,
          },
          {
            slug: 'predominantTalentGender',
            title: 'Predominant Talent Gender',
            value: gendersBucketName,
            percentage: gendersIndustryPercent,
            text: `<b>{percentage}%</b> of ${performingText}industry videos are <b>{title}</b> of <b>{value}</b>`,
          },
          {
            slug: 'aspectRatio',
            title: 'Aspect Ratio',
            value: aspectRatiosBucketName,
            percentage: aspectRatiosIndustryPercent,
            text: `<b>{percentage}%</b> of ${performingText}industry videos have an <b>{title}</b> of <b>{value}</b>`,
          },
          {
            slug: 'resolution',
            title: 'Resolution',
            value: resolutionsBucketName,
            percentage: resolutionsIndustryPercent,
            text: `<b>{percentage}%</b> of ${performingText}industry videos have a <b>{title}</b> of <b>{value}</b>`,
          },
          {
            slug: 'frameRate',
            title: 'Frame Rate',
            value:
              frameRatesBucketName === '' ? '' : `${frameRatesBucketName}fps`,
            percentage: frameRatesIndustryPercent,
            text: `<b>{percentage}%</b> of ${performingText}industry videos have a <b>{title}</b> of <b>{value}</b>`,
          },
        ],
      }
  
      return maxVideo
    }

  const serverData = yield call(
    getDataFromApi,
    {},
    `/quickview?${querystring.stringify({
      metric,
      daterange: dateRange,
      platform,
      brandUuid,
      competitors: JSON.stringify(competitors),
    })}`,
    'GET'
  )

  const serverObject = Object.keys(serverData).reduce(
    (accumulator, compareKey) => {
      if (!accumulator[platform]) {
        accumulator[platform] = [null, null]
      }
      const videoInfo = serverData[compareKey] || {}
      let type

      switch (compareKey) {
        case 'maxVideo':
          type = 'maxVideo'
          accumulator[platform][1] = parseVideoResponse({
            videoInfo,
            serverData,
            type,
          })
          break

        case 'minVideo':
          type = 'minVideo'
          accumulator[platform][0] = parseVideoResponse({
            videoInfo,
            serverData,
            type,
          })
          break

        case 'differences':
          accumulator.differences[platform] = videoInfo
          break
      }

      return accumulator
    },
    {
      differences: {},
    }
  )

  return serverObject
}

function* getQuickviewItemsSaga({ payload }) {
  try {
    const { platform = 'facebook', data = {} } = payload
    const { metric = 'views', dateRange = 'week' } = data

    const profile = yield select(selectAuthProfile)
    const { brand = {} } = profile
    const { uuid, competitors = [] } = brand

    if (!uuid) {
      throw new Error('brand uuid must be provided')
    }

    try {
      const response = yield call(getQuickviewItemsApi, {
        platform,
        metric,
        dateRange,
        brandUuid: uuid,
        competitors,
      })
  
      yield put({
        type: types.GET_QUICKVIEW_ITEMS_SUCCESS,
        payload: {
          platformsValues: percentageManipulation(response[platform]),
          differencesValues: percentageManipulation(
            response.differences[platform]
          ),
        },
      })
    } catch (error) {
      
      const response = {
        "differences": {
          "facebook": {
            "duration": "0"
          }
        },
        "facebook": [
          {
            "video": {
              "title": "",
              "socialIcon": "",
              "cvScore": ""
            },
            "infos": [
              {
                "slug": "duration",
                "title": "Duration",
                "value": "",
                "percentage": "",
                "text": ""
              }
            ]
          },
          {
            "video": {
              "title": "",
              "socialIcon": "",
              "cvScore": ""
            },
            "infos": [
              {
                "slug": "duration",
                "title": "Duration",
                "value": "",
                "percentage": "",
                "text": ""
              }
            ]
          }
        ]
      }

      yield put({
        type: types.GET_QUICKVIEW_ITEMS_SUCCESS,
        payload: {
          platformsValues: percentageManipulation(response['facebook']),
          differencesValues: percentageManipulation(
            response.differences['facebook']
          )
        },
      })
      
    }
  } catch (error) {
    yield put({
      type: types.GET_QUICKVIEW_ITEMS_FAILURE,
      error,
    })
  }
}

export default [
  takeLatest(types.GET_QUICKVIEW_ITEMS_REQUEST, getQuickviewItemsSaga),
]
