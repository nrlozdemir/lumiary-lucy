import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { connectRouter } from 'connected-react-router'

import Library from './library'
import Quickview from './quickview'
import Marketview from './marketview'
import Panoptic from './panoptic'
import LibraryDetail from './libraryDetail'
import Reports from './reports'
import GeneratedReport from './generatedReport'
import Audience from './audience'
import app from './app'
import auth from './auth'
import SelectFilters from './selectFilters'
import history from '../history'
import store from '../configureStore'

const appReducer = combineReducers({
  router: connectRouter(history),
  app,
  auth,
  Library,
  Quickview,
  Marketview,
  Panoptic,
  LibraryDetail,
  Reports,
  GeneratedReport,
  form: formReducer,
  Audience,
  SelectFilters,
})

const rootReducer = (state, action) => {
  if (action.type === 'AUTH/LOGOUT_SUCCESS') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
