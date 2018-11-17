export const types = {
  TEST: 'TEST'
}

export const actions = {
  // deleteNotification: (payload) => ({ type: types.DELETE_NOTIFICATION, payload }),
}

export const initialState = {
  data: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case types.TEST:
      return {
        ...state,
      }

    default:
      return state
  }
}

export default reducer
