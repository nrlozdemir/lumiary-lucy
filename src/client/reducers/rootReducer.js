import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import Library from './library'
import Quickview from './quickview'
import Marketview from './marketview'
import Panoptic from './panoptic'
import LibraryDetail from './libraryDetail'
import Reports from './reports'
import app from './app'

const rootReducer = (history) =>
  combineReducers({
    app,
    Library,
    Quickview,
    Marketview,
    Panoptic,
    LibraryDetail,
    Reports,
    form: formReducer,
  })

export default rootReducer
