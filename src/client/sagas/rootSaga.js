import { all } from 'redux-saga/effects'

import library from './library'
import libraryDetail from './libraryDetail'
import panoptic from './panoptic'
import quickview from './quickview'
import marketview from './marketview'
import reports from './reports'
import generatedReport from './generatedReport'
import audience from './audience'
import auth from './auth'
import app from './app'

export default function* rootSaga() {
  yield all([
    ...app,
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
}
