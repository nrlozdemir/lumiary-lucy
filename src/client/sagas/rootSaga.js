import { call, all, take, actionChannel } from 'redux-saga/effects'

import { types as globalTypes } from 'Reducers/global'
import global from './global'

import library from './library'
import libraryDetail from './libraryDetail'
import panoptic from './panoptic'
import quickview from './quickview'
import marketview from './marketview'
import reports from './reports'
import generatedReport from './generatedReport'
import audience from './audience'
import auth from './auth'

export default function* rootSaga() {
  yield all([
    ...auth,
    ...library,
    ...libraryDetail,
    ...quickview,
    ...panoptic,
    ...marketview,
    ...reports,
    ...generatedReport,
    ...audience,
  ])

  // Quene for all section explanations
  while (true) {
    const requestChan = yield actionChannel(
      globalTypes.GET_SECTION_EXPLANATIONS_REQUEST
    )
    let resetChannel = false

    while (!resetChannel) {
      const action = yield take(requestChan)
      resetChannel = yield call(global.getSectionExplanations, action)
    }
  }
}
