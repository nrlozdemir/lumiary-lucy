import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

export const types = {

  GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA: 'Audience/GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA',
  GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA_SUCCESS: 'Audience/GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA_SUCCESS',
  GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA_ERROR: 'Audience/GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA_ERROR',

  GET_AUDIENCE_PERFORMANCE_DATA: 'Audience/GET_AUDIENCE_PERFORMANCE_DATA',
  GET_AUDIENCE_PERFORMANCE_DATA_SUCCESS: 'Audience/GET_AUDIENCE_PERFORMANCE_DATA_SUCCESS',
  GET_AUDIENCE_PERFORMANCE_DATA_ERROR: 'Audience/GET_AUDIENCE_PERFORMANCE_DATA_ERROR',

  GET_AUDIENCE_AGE_SLIDER_DATA: 'Audience/GET_AUDIENCE_AGE_SLIDER_DATA',
  GET_AUDIENCE_AGE_SLIDER_DATA_SUCCESS: 'Audience/GET_AUDIENCE_AGE_SLIDER_DATA_SUCCESS',
  GET_AUDIENCE_AGE_SLIDER_DATA_ERROR: 'Audience/GET_AUDIENCE_AGE_SLIDER_DATA_ERROR',

  GET_AUDIENCE_GENDER_DATA: 'Audience/GET_AUDIENCE_GENDER_DATA',
  GET_AUDIENCE_GENDER_DATA_SUCCESS: 'Audience/GET_AUDIENCE_GENDER_DATA_SUCCESS',
  GET_AUDIENCE_GENDER_DATA_ERROR: 'Audience/GET_AUDIENCE_GENDER_DATA_ERROR',

  GET_AUDIENCE_COLOR_TEMPERATURE_DATA: 'Audience/GET_AUDIENCE_COLOR_TEMPERATURE_DATA',
  GET_AUDIENCE_COLOR_TEMPERATURE_DATA_SUCCESS: 'Audience/GET_AUDIENCE_COLOR_TEMPERATURE_DATA_SUCCESS',
  GET_AUDIENCE_COLOR_TEMPERATURE_DATA_ERROR: 'Audience/GET_AUDIENCE_COLOR_TEMPERATURE_DATA_ERROR',

  GET_AUDIENCE_CHANGE_OVER_TIME_DATA: 'Audience/GET_AUDIENCE_CHANGE_OVER_TIME_DATA',
  GET_AUDIENCE_CHANGE_OVER_TIME_DATA_SUCCESS: 'Audience/GET_AUDIENCE_CHANGE_OVER_TIME_DATA_SUCCESS',
  GET_AUDIENCE_CHANGE_OVER_TIME_DATA_ERROR: 'Audience/GET_AUDIENCE_CHANGE_OVER_TIME_DATA_ERROR',

  GET_AUDIENCE_DOMINANT_COLOR_DATA: 'Audience/GET_AUDIENCE_DOMINANT_COLOR_DATA',
  GET_AUDIENCE_DOMINANT_COLOR_DATA_SUCCESS: 'Audience/GET_AUDIENCE_DOMINANT_COLOR_DATA_SUCCESS',
  GET_AUDIENCE_DOMINANT_COLOR_DATA_ERROR: 'Audience/GET_AUDIENCE_DOMINANT_COLOR_DATA_ERROR',
}

export const actions = {
  getAudienceContentVitalityScoreData: (payload) => ({
    type: types.GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA,
    payload
  }),
  getAudienceContentVitalityScoreDataSuccess: (payload) => ({
    type: types.GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA_SUCCESS,
    payload,
  }),
  getAudienceContentVitalityScoreDataError: (error) => ({
    type: types.GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA_ERROR,
    error,
  }),

  getAudiencePerformanceData: (payload) => ({
    type: types.GET_AUDIENCE_PERFORMANCE_DATA,
    payload
  }),
  getAudiencePerformanceDataSuccess: (payload) => ({
    type: types.GET_AUDIENCE_PERFORMANCE_DATA_SUCCESS,
    payload,
  }),
  getAudiencePerformanceDataError: (error) => ({
    type: types.GET_AUDIENCE_PERFORMANCE_DATA_ERROR,
    error,
  }),

  getAudienceAgeSliderData: () => ({
    type: types.GET_AUDIENCE_AGE_SLIDER_DATA,
  }),
  getAudienceAgeSliderDataSuccess: (payload) => ({
    type: types.GET_AUDIENCE_AGE_SLIDER_DATA_SUCCESS,
    payload,
  }),
  getAudienceAgeSliderDataError: (error) => ({
    type: types.GET_AUDIENCE_AGE_SLIDER_DATA_ERROR,
    error,
  }),

  getAudienceGenderData: () => ({
    type: types.GET_AUDIENCE_GENDER_DATA,
  }),
  getAudienceGenderDataSuccess: (payload) => ({
    type: types.GET_AUDIENCE_GENDER_DATA_SUCCESS,
    payload,
  }),
  getAudienceGenderDataError: (error) => ({
    type: types.GET_AUDIENCE_GENDER_DATA_ERROR,
    error,
  }),

  getAudienceColorTemperatureData: () => ({
    type: types.GET_AUDIENCE_COLOR_TEMPERATURE_DATA,
  }),
  getAudienceColorTemperatureDataSuccess: (payload) => ({
    type: types.GET_AUDIENCE_COLOR_TEMPERATURE_DATA_SUCCESS,
    payload,
  }),
  getAudienceColorTemperatureDataError: (error) => ({
    type: types.GET_AUDIENCE_COLOR_TEMPERATURE_DATA_ERROR,
    error,
  }),

  getAudienceChangeOverTimeData: () => ({
    type: types.GET_AUDIENCE_CHANGE_OVER_TIME_DATA,
  }),
  getAudienceChangeOverTimeDataSuccess: (payload) => ({
    type: types.GET_AUDIENCE_CHANGE_OVER_TIME_DATA_SUCCESS,
    payload,
  }),
  getAudienceChangeOverTimeDataError: (error) => ({
    type: types.GET_AUDIENCE_CHANGE_OVER_TIME_DATA_ERROR,
    error,
  }),

  getAudienceDominantColorData: (data) => ({
		type: types.GET_AUDIENCE_DOMINANT_COLOR_DATA,
		data
  }),
  getAudienceDominantColorDataSuccess: (payload) => ({
    type: types.GET_AUDIENCE_DOMINANT_COLOR_DATA_SUCCESS,
    payload,
  }),
  getAudienceDominantColorDataError: (error) => ({
    type: types.GET_AUDIENCE_DOMINANT_COLOR_DATA_ERROR,
    error,
  }),
}

export const initialState = fromJS({
  data: {},
  audienceContentVitalityScoreData: {
    data: [],
    loading: false,
    error: null,
  },
  audiencePerformanceData: {
    data: {},
    loading: false,
    error: null,
  },
  audienceAgeSliderData: {
    data: [],
    loading: false,
    error: null,
  },
  audienceGenderData: {
    data: [],
    loading: false,
    error: null,
  },
  audienceColorTemperatureData: {
    data: [],
    loading: false,
    error: null,
  },
  audienceChangeOverTimeData: {
    data: [],
    loading: false,
    error: null,
  },
  audienceDominantColorData: {
    data: {},
    loading: false,
    error: null,
  },
  loading: false,
  error: false,
})

const audienceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA:
      return state
        .setIn(
          ['audienceContentVitalityScoreData', 'loading'],
          fromJS(true)
        )

    case types.GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA_SUCCESS:
      return state
        .setIn(
          ['audienceContentVitalityScoreData', 'data'],
          fromJS(action.payload)
        )
        .setIn(
          ['audienceContentVitalityScoreData', 'loading'],
          fromJS(false)
        )

    case types.GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA_ERROR:
      return state
        .setIn(
          ['audienceContentVitalityScoreData', 'error'],
          fromJS(action.error)
        )
        .setIn(
          ['audienceContentVitalityScoreData', 'loading'],
          fromJS(false)
        )

    case types.GET_AUDIENCE_PERFORMANCE_DATA:
      return state
        .setIn(
          ['audiencePerformanceData', 'loading'],
          fromJS(true)
        )

    case types.GET_AUDIENCE_PERFORMANCE_DATA_SUCCESS:
      return state
        .setIn(
          ['audiencePerformanceData', 'data'],
          fromJS(action.payload)
        )
        .setIn(
          ['audiencePerformanceData', 'loading'],
          fromJS(false)
        )

    case types.GET_AUDIENCE_PERFORMANCE_DATA_ERROR:
      return state
        .setIn(
          ['audiencePerformanceData', 'error'],
          fromJS(action.error)
        )
        .setIn(
          ['audiencePerformanceData', 'loading'],
          fromJS(false)
        )

    case types.GET_AUDIENCE_AGE_SLIDER_DATA:
      return state
        .setIn(
          ['audienceAgeSliderData', 'loading'],
          fromJS(true)
        )

    case types.GET_AUDIENCE_AGE_SLIDER_DATA_SUCCESS:
      return state
        .setIn(
          ['audienceAgeSliderData', 'data'],
          fromJS(action.payload)
        )
        .setIn(
          ['audienceAgeSliderData', 'loading'],
          fromJS(false)
        )

    case types.GET_AUDIENCE_AGE_SLIDER_DATA_ERROR:
      return state
        .setIn(
          ['audienceAgeSliderData', 'error'],
          fromJS(action.error)
        )
        .setIn(
          ['audienceAgeSliderData', 'loading'],
          fromJS(false)
        )

    case types.GET_AUDIENCE_GENDER_DATA:
      return state
        .setIn(
          ['audienceGenderData', 'loading'],
          fromJS(true)
        )

    case types.GET_AUDIENCE_GENDER_DATA_SUCCESS:
      return state
        .setIn(
          ['audienceGenderData', 'data'],
          fromJS(action.payload)
        )
        .setIn(
          ['audienceGenderData', 'loading'],
          fromJS(false)
        )

    case types.GET_AUDIENCE_GENDER_DATA_ERROR:
      return state
        .setIn(
          ['audienceGenderData', 'error'],
          fromJS(action.error)
        )
        .setIn(
          ['audienceGenderData', 'loading'],
          fromJS(false)
        )

    case types.GET_AUDIENCE_COLOR_TEMPERATURE_DATA:
      return state
        .setIn(
          ['audienceColorTemperatureData', 'loading'],
          fromJS(true)
        )

    case types.GET_AUDIENCE_COLOR_TEMPERATURE_DATA_SUCCESS:
      return state
        .setIn(
          ['audienceColorTemperatureData', 'data'],
          fromJS(action.payload)
        )
        .setIn(
          ['audienceColorTemperatureData', 'loading'],
          fromJS(false)
        )

    case types.GET_AUDIENCE_COLOR_TEMPERATURE_DATA_ERROR:
      return state
        .setIn(
          ['audienceColorTemperatureData', 'error'],
          fromJS(action.error)
        )
        .setIn(
          ['audienceColorTemperatureData', 'loading'],
          fromJS(false)
        )

    case types.GET_AUDIENCE_CHANGE_OVER_TIME_DATA:
      return state
        .setIn(
          ['audienceChangeOverTimeData', 'loading'],
          fromJS(true)
        )

    case types.GET_AUDIENCE_CHANGE_OVER_TIME_DATA_SUCCESS:
      return state
        .setIn(
          ['audienceChangeOverTimeData', 'data'],
          fromJS(action.payload)
        )
        .setIn(
          ['audienceChangeOverTimeData', 'loading'],
          fromJS(false)
        )

    case types.GET_AUDIENCE_CHANGE_OVER_TIME_DATA_ERROR:
      return state
        .setIn(
          ['audienceChangeOverTimeData', 'error'],
          fromJS(action.error)
        )
        .setIn(
          ['audienceChangeOverTimeData', 'loading'],
          fromJS(false)
        )

    case types.GET_AUDIENCE_DOMINANT_COLOR_DATA:
      return state
        .setIn(
          ['audienceDominantColorData', 'loading'],
          fromJS(true)
        )

    case types.GET_AUDIENCE_DOMINANT_COLOR_DATA_SUCCESS:
      return state
        .setIn(
          ['audienceDominantColorData', 'data'],
          fromJS(action.payload)
        )
        .setIn(
          ['audienceDominantColorData', 'loading'],
          fromJS(false)
        )

    case types.GET_AUDIENCE_DOMINANT_COLOR_DATA_ERROR:
      return state
        .setIn(
          ['audienceDominantColorData', 'error'],
          fromJS(action.error)
        )
        .setIn(
          ['audienceDominantColorData', 'loading'],
          fromJS(false)
        )

    default:
      return state
  }
}

export const selectAudienceDomain = (state) => state.Audience

const selectAudienceContentVitalityScoreDomain = (state) =>
  state.Audience.get('audienceContentVitalityScoreData')

export const makeSelectAudienceContentVitalityScore = () =>
  createSelector(
    selectAudienceContentVitalityScoreDomain,
    (substate) => substate.toJS()
  )

const selectAudiencePerformanceDomain = (state) =>
  state.Audience.get('audiencePerformanceData')

export const makeSelectAudiencePerformance = () =>
  createSelector(
    selectAudiencePerformanceDomain,
    (substate) => substate.toJS()
  )

const selectAudienceAgeSliderDomain = (state) =>
  state.Audience.get('audienceAgeSliderData')

export const makeSelectAudienceAgeSlider = () =>
  createSelector(
    selectAudienceAgeSliderDomain,
    (substate) => substate.toJS()
  )

const selectAudienceGenderDomain = (state) =>
  state.Audience.get('audienceGenderData')

export const makeSelectAudienceGender = () =>
  createSelector(
    selectAudienceGenderDomain,
    (substate) => substate.toJS()
  )

const selectAudienceColorTemperatureDomain = (state) =>
  state.Audience.get('audienceColorTemperatureData')

export const makeSelectAudienceColorTemperature = () =>
  createSelector(
    selectAudienceColorTemperatureDomain,
    (substate) => substate.toJS()
  )

const selectAudienceChangeOverTimeDomain = (state) =>
  state.Audience.get('audienceChangeOverTimeData')

export const makeSelectAudienceChangeOverTime = () =>
  createSelector(
    selectAudienceChangeOverTimeDomain,
    (substate) => substate.toJS()
  )

const selectAudienceDominantColorDomain = (state) =>
  state.Audience.get('audienceDominantColorData')

export const makeSelectAudienceDominantColor = () =>
  createSelector(
    selectAudienceDominantColorDomain,
    (substate) => substate.toJS()
  )

export default audienceReducer
