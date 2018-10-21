import { compose, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { autoRehydrate } from 'redux-persist'
import rootReducer from './reducers'
import rootSaga from './sagas'


/* eslint-disable no-underscore-dangle */
const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/* eslint-enable */

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeEnhancers(
    autoRehydrate({log: false}),
    applyMiddleware(
      sagaMiddleware
    )
  )
)

sagaMiddleware.run(rootSaga)

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
