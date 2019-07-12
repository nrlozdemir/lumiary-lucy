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
import Global from './global'

const rootReducer = (history) =>
  combineReducers({
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
    Global,
  })

export default rootReducer
