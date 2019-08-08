import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'

import rootReducer from 'Reducers/rootReducer'
import sagaManager from 'Sagas/sagaManager'
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

  sagaManager.startSagas(sagaMiddleware)

  if (module.hot) {
    module.hot.accept('./sagas/sagaManager', () => {
      sagaManager.cancelSagas(store)
      require('Sagas/sagaManager').default.startSagas(sagaMiddleware)
    })
  }

  return store
}

export default store()
