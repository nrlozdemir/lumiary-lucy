import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import app    from './app'
import home   from './home'
import dropzone from './dropzone'

const appReducer = combineReducers({
    app,
    home,
    dropzone,
    form: formReducer,
})

const rootReducer = (state, action) => {

  return appReducer(state, action)
}

export default rootReducer
