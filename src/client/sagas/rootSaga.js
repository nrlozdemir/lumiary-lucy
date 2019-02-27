import { all } from 'redux-saga/effects'

import library from './library'
import libraryDetail from './libraryDetail'
import panoptic from './panoptic'
import quickview from './quickview'
import marketview from './marketview'
import reports from './reports'

export default function* rootSaga() {
  yield all([
    ...library,
    ...libraryDetail,
    ...quickview,
    ...panoptic,
    ...marketview,
    ...reports,
  ])
}
