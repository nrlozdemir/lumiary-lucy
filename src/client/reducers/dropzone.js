import update from 'immutability-helper'

export const types = {
  HANDLE_UPLOAD: 'DROPZONE/HANDLE_UPLOAD',
  HANDLE_DROP: 'DROPZONE/HANDLE_DROP',
  HANDLE_PROGRESS: 'DROPZONE/HANDLE_PROGRESS',

  DROPZONE_UPDATE: 'DROPZONE/UPDATE',
  DROPZONE_CLEAR: 'DROPZONE/CLEAR',

  DROPZONE_TOGGLE_MODAL: 'DROPZONE/TOGGLE_MODAL',

  DROPZONE_ERROR: 'DROPZONE/ERROR'
}

export const actions = {
  handleUpload: (payload) => ({ type: types.HANDLE_UPLOAD, payload }),
  handleDrop: (payload) => ({ type: types.HANDLE_DROP, payload }),
  handleProgress: (payload) => ({ type: types.HANDLE_PROGRESS, payload }),

  updateDropzone: (payload) => ({ type: types.DROPZONE_UPDATE, payload }),
  resetDropzone: () => ({ type: types.DROPZONE_CLEAR }),

  toggleDropzoneModal: () => ({ type: types.DROPZONE_TOGGLE_MODAL })
}

export const initialState = {
  files: [],
  tmp: [],
  progress: [],
  uploading: [],
  editItem: null,
  modalOpen: false
}

const reducer = (state = initialState, action) => {
  const { payload } = action
  switch(action.type) {
    case types.DROPZONE_UPDATE:
      return update(state, { 
        $merge: payload 
      })

    case types.DROPZONE_ERROR:
      return state

    case types.DROPZONE_TOGGLE_MODAL:
      return update(state, { 
        modalOpen: { $set: !state.modalOpen }
      })

    case types.DROPZONE_CLEAR:
      return initialState
  }

  return state
}

export default reducer