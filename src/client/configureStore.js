import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'

import rootReducer from 'Reducers/rootReducer'
import rootSaga from 'Sagas/rootSaga'
import history from './history'

const composeEnhancers =
  process.env.NODE_ENV === 'production'
    ? compose
    : typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const sagaMiddleware = createSagaMiddleware({
  ...(typeof window === 'object' && process.env.NODE_ENV !== 'production'
    ? {
        sagaMonitor: window['__SAGA_MONITOR_EXTENSION__'],
      }
    : {}),
})

const store = function configureStore() {
  const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(routerMiddleware(history))
  )
  const store = createStore(rootReducer(history), enhancer)
  let sagaTask = sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('./reducers/rootReducer', () => {
      const nextRootReducer = require('Reducers/rootReducer')
      store.replaceReducer(nextRootReducer)
    })
    module.hot.accept('./sagas/rootSaga', () => {
      sagaTask.cancel()
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(require('Sagas/rootSaga'))
      })
    })
  }

  return store
}

export default store()
