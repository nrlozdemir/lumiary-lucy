import { fromJS } from "immutable";

export const types = {
  GET_LIBRARY_DETAIL_REQUEST: "LibraryDetail/GET_LIBRARY_DETAIL_REQUEST",
  GET_LIBRARY_DETAIL_SUCCESS: "LibraryDetail/GET_LIBRARY_DETAIL_SUCCESS",
  GET_LIBRARY_DETAIL_FAILURE: "LibraryDetail/GET_LIBRARY_DETAIL_FAILURE"
};
export const actions = {
  getLibraryDetailRequest: payload => ({
    type: types.GET_LIBRARY_DETAIL_REQUEST,
    payload
  }),
  getLibraryDetailSuccess: payload => ({
    type: types.GET_LIBRARY_DETAIL_SUCCESS,
    payload
  }),
  getLibraryDetailFailure: error => ({
    type: types.GET_LIBRARY_DETAIL_FAILURE,
    error
  })
};
export const initialState = fromJS({
  libraryDetail: null,
  error: false,
  loading: false
});

const libraryDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LIBRARY_DETAIL_REQUEST:
      return state.set("loading", fromJS(true));
    case types.GET_LIBRARY_DETAIL_SUCCESS:
      return state
        .set("libraryDetail", fromJS(action.payload))
        .set("loading", fromJS(false));
    case types.GET_LIBRARY_DETAIL_FAILURE:
      return state
        .set("error", fromJS(action.error))
        .set("loading", fromJS(false));
    default:
      return state;
  }
};

export default libraryDetailReducer;
