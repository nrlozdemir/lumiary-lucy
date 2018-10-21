import { appFlow } from './app'
import { dropzoneFlow } from './dropzone'
import homeSagas from './home'


import { all, fork, take } from 'redux-saga/effects'
import { REHYDRATE } from 'redux-persist/constants'

export default function* rootSaga() {
  const rehydated = yield take(REHYDRATE)

  yield all([
    fork(appFlow),
    fork(dropzoneFlow),
    ...homeSagas,
  ])
}
