import React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import ThemeProvider from './themeContext/themeProvider'

import './App.scss'

import Routes from './routes'
import store from './configureStore'
import history from './history'

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
)

export default hot(module)(App)
