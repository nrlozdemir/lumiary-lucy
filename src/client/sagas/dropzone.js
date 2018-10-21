import { call, put, all, takeLatest } from 'redux-saga/effects'

import { types, actions } from 'Reducers/dropzone'

function* dropzoneUploadFlow({ payload }) {
  const { updatedTmp, updatedUploading, updatedEditItem } = payload

  try {
    yield put(actions.updateDropzone({
      tmp: updatedTmp,
      uploading: updatedUploading,
      editItem: updatedEditItem
    }))
  } catch (error) {
    yield put(actions.dropzoneError(error))
  }
}

function* dropzoneDropFlow({ payload }) {
  const { files, uploading } = payload

  try {
    yield put(actions.updateDropzone({
      files,
      uploading
    }))
  } catch (error) {
    yield put(actions.dropzoneError(error))
  }
}

function* dropzoneProgressFlow({ payload }) {
  const { progress } = payload

  try {
    yield put(actions.updateDropzone({
      progress
    }))
  } catch (error) {
    yield put(actions.dropzoneError(error))
  }
}

export function* dropzoneFlow() {
  yield all([
    yield takeLatest(types.HANDLE_UPLOAD, dropzoneUploadFlow),
    yield takeLatest(types.HANDLE_DROP, dropzoneDropFlow),
    yield takeLatest(types.HANDLE_PROGRESS, dropzoneProgressFlow)
  ]);
}