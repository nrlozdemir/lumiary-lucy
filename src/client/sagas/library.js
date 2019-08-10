import qs from 'qs'
import { ajax } from 'Utils/api'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { types, actions, makeSelectVideoFilters } from 'Reducers/library'
import { makeSelectAuthProfile } from 'Reducers/auth'

import { percentageManipulation } from 'Utils/datasets'

const RESOURCE = '/brand'

function getLibraryDataApi(vals, brand_id) {
  const { limit, page, body = {} } = vals

  return ajax({
    url: `${RESOURCE}/${brand_id}?limit=${limit}&page=${page}`,
    method: 'POST',
    params: qs.stringify(body),
  }).then((response) => {
    if (response.error) {
      throw response.error
    }
    return response.data
  })
}

function* getVideos(values) {
  const page = values && values.payload && values.payload.page
  try {
    const { brand } = yield select(makeSelectAuthProfile())
    const filters = yield select(makeSelectVideoFilters())
    const body = getBodyFromFilters(filters)

    const options = {
      limit: 16,
      page: page || 1,
      body,
    }

    const payload = yield call(getLibraryDataApi, options, brand.uuid)

    yield put(actions.loadVideosSuccess(percentageManipulation(payload)))
  } catch (err) {
    console.log(err)
    yield put(actions.loadVideosError(err))
  }
}

function getBodyFromFilters(filters = {}) {
  return Object.keys(filters).reduce((accumulator, filter) => {
    const thisFilter = filters[filter]
    switch (filter) {
      case 'Search':
        accumulator['term'] = thisFilter.value
        break

      case 'AspectRatio':
        if (!accumulator['aspectRatios']) {
          accumulator['aspectRatios'] = []
        }
        accumulator['aspectRatios'].push(thisFilter.value)
        break

      case 'Duration':
        accumulator['duration'] = {
          min: thisFilter[0],
          max: thisFilter[1],
        }
        break

      case 'Facebook':
      case 'Instagram':
      case 'Youtube':
      case 'Twitter':
        if (!accumulator['platforms']) {
          accumulator['platforms'] = []
        }

        if (thisFilter) {
          accumulator['platforms'].push(filter.toLowerCase())
        }
        break

      case 'FramesPerSecond':
        if (!accumulator['frameRates']) {
          accumulator['frameRates'] = []
        }
        accumulator['frameRates'].push(thisFilter.value)
        break

      case 'OrderedBy':
        if (!accumulator['orderBy']) {
          accumulator['orderBy'] = []
        }

        switch (thisFilter.value) {
          case 'mostLikedVideos':
            accumulator['orderBy'].push(['likes', 'desc'])
            break

          case 'mostViewedVideos':
            accumulator['orderBy'].push(['views', 'desc'])
            break

          case 'mostSharedVideos':
            accumulator['orderBy'].push(['shares', 'desc'])
            break

          case 'mostCommentedVideos':
            accumulator['orderBy'].push(['comments', 'desc'])
            break
        }
        break

      case 'Pacing':
        if (!accumulator['pacings']) {
          accumulator['pacings'] = []
        }
        accumulator['pacings'].push(thisFilter.value.toLowerCase())
        break

      case 'Resolution':
        if (!accumulator['resolutions']) {
          accumulator['resolutions'] = []
        }
        accumulator['resolutions'].push(thisFilter.value.toLowerCase())
        break

      case 'VideoFormat':
        if (!accumulator['formats']) {
          accumulator['formats'] = []
        }
        accumulator['formats'].push(thisFilter.value)
        break

      case 'radioColorSelected':
        if (!accumulator['colors']) {
          accumulator['colors'] = []
        }
        accumulator['colors'].push(
          thisFilter.name.toLowerCase().replace(/ /g, '-')
        )
        break
    }

    return accumulator
  }, {})
}

function* changeFilter() {
  try {
    const filters = yield select(makeSelectVideoFilters())
    const body = getBodyFromFilters(filters)
    const { brand } = yield select(makeSelectAuthProfile())

    const options = {
      limit: 16,
      page: 1,
      body,
    }

    const payload = yield call(getLibraryDataApi, options, brand.uuid)

    yield put(actions.clearAndLoadVideos(payload))
  } catch (err) {
    console.log(err)
    yield put(actions.loadVideosError(err))
  }
}

export default [
  takeLatest(types.LOAD_VIDEOS, getVideos),
  takeLatest(types.CHANGE_FILTER, changeFilter),
]
