import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'

import { types, actions } from 'Reducers/quickview'

//mocks
import quickviewItemsData from 'Api/mocks/quickviewItemsMock.json'

function getQuickviewItemsApi() {
  //this will use ajax function in utils/api when real data is provided

  const platform = 'facebook'
  const serverData = {
    "maxVideo": {
      "id": 1130,
      "uuid": "13c710aa-1c0b-450a-9fe1-0b4274a83fd4",
      "title": "The levels of disrespect...\n\n(via _kennedychandler1/IG)",
      "fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/facebook/13c710aa-1c0b-450a-9fe1-0b4274a83fd4/442696289887625.mp4",
      "date": "2019-06-04T15:55:13.000Z",
      "brand_uuid": "d65aa957-d094-4cf3-8d37-dafe50e752ea",
      "platform": null,
      "createdAt": "2019-06-04T17:14:42.914Z",
      "updatedAt": "2019-06-04T19:41:00.899Z",
      "cvScores.value": 15.376738536833,
      "aspectRatios.value": "4:5",
      "frameRates.value": 30,
      "durations.value": 5.933984,
      "durations.bucket_name": '0-15',
      "pacings.value": 5.9,
      "pacings.bucket_name": 'Medium',
      "formats.value": "None",
      "resolutions.value": "480p"
    },
    "minVideo": {
      "id": 1125,
      "uuid": "a9be4618-0296-48c6-849c-de7ac547f992",
      "title": "Steph wishes he would've handled things differently",
      "fileName": "d65aa957-d094-4cf3-8d37-dafe50e752ea/facebook/a9be4618-0296-48c6-849c-de7ac547f992/2435667196490605.mp4",
      "date": "2019-06-04T16:51:46.000Z",
      "brand_uuid": "d65aa957-d094-4cf3-8d37-dafe50e752ea",
      "platform": null,
      "createdAt": "2019-06-04T17:12:22.854Z",
      "updatedAt": "2019-06-04T19:40:58.746Z",
      "cvScores.value": 1,
      "aspectRatios.value": "1:1",
      "frameRates.value": 29.97,
      "durations.value": 9.34301,
      "durations.bucket_name": '31-60',
      "pacings.value": 2.0353685,
      "pacings.bucket_name": 'Slowest',
      "formats.value": "None",
      "resolutions.value": "480p"
    },
    "differences": {
      "duration": 36.48744890565246,
      "pacings": 189.87379926534186
    }
  }

  const parseVideoResponse = (videoData) => {
    const { 
      title = '', 
      brand_uuid = '', 
      uuid = '', 
      'cvScores.value':cvScoreValue = '',
      'durations.value':durationsValue = '',
      'pacings.value':pacingsValue = '',
      'durations.bucket_name':durationsBucketName = '',
      'pacings.bucket_name':pacingsBucketName = '',
      'formats.value':formatsValue = '',
      'aspectRatios.value':aspectRatiosValue = '',
      'resolutions.value':resolutionsValue = '',
      'frameRates.value':frameRatesValue = '',
    } = videoData

    const maxVideo = {
      video: {
        title: title,
        videoUrl: `https://s3.amazonaws.com/quickframe-media-staging/lumiere/${brand_uuid}/${uuid}.mp4`,
        poster: `https://s3.amazonaws.com/quickframe-media-staging/lumiere/${brand_uuid}/${uuid}.mp4`,
        socialIcon: platform,
        cvScore: cvScoreValue,
      },
      infos: [
        {
          "title": "Duration",
          "value": durationsBucketName,
          "percentage": 0,
          "text": "{value} of best performing industry videos are {percentage} sec in length"
        },
        {
            "title": "Pacing",
            "value": pacingsBucketName,
            "percentage": 0,
            "text": "{percentage} of best performing industry videos have <b>{value} {title}</b>"
        },
        {
            "title": "Format",
            "value": formatsValue,
            "percentage": 0,
            "text": "{percentage} of best performing industry videos have a <b>{title}</b> of <b>{value}</b>"
        },
        {
            "title": "Dominant Color",
            "value": "N/A",
            "percentage": 0,
            "text": "{percentage} of best performing industry videos have a <b>{title}</b> of <b>{value}</b>"
        },
        {
            "title": "Predominant Talent Age",
            "value": "N/A",
            "percentage": 0,
            "text": "{percentage} of best performing industry videos are <b>{title}</b> of <b>{value}</b>"
        },
        {
            "title": "Predominant Talent Gender",
            "value": "N/A",
            "percentage": 0,
            "text": "{percentage} of best performing industry videos are <b>{title}</b> of <b>{value}</b>"
        },
        {
            "title": "Aspect Ratio",
            "value": aspectRatiosValue,
            "percentage": 0,
            "text": "{percentage} of best performing industry videos have an <b>{title}</b> of <b>{value}</b>"
        },
        {
            "title": "Resolution",
            "value": resolutionsValue,
            "percentage": 0,
            "text": "{percentage} of best performing industry videos have a <b>{title}</b> of <b>{value}</b>"
        },
        {
            "title": "Frame Rate",
            "value": `${frameRatesValue}fps`,
            "percentage": 0,
            "text": "{percentage} of best performing industry videos have a <b>{title}</b> of <b>{value}</b>"
        }
      ]
    }

    return maxVideo
  }

  const serverObject = Object.keys(serverData).reduce((accumulator, compareKey) => {
    if(!accumulator[platform]){
      accumulator[platform] = [null, null]
    }
    const videoInfo = serverData[compareKey] || {}

    switch (compareKey) {
      case 'maxVideo':
        accumulator[platform][1] = parseVideoResponse(videoInfo)
        break

      case 'minVideo':
        accumulator[platform][0] = parseVideoResponse(videoInfo)
        break

      case 'differences':
        break
    }

    return accumulator
  }, {})

  console.log(serverObject)
  console.log(quickviewItemsData)

  return axios.get('/').then((res) => serverObject)
}

function* getQuickviewItemsSaga({ payload }) {
  try {
    const { platform, data } = payload

    console.log('get quickview', data, platform)

    const response = yield call(getQuickviewItemsApi)

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
