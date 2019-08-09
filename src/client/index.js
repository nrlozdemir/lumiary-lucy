import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/browser'

import App from './App'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://71e88d90e3b4440e87da3550dec33e52@sentry.io/1355450',
    environment: process.env.ENVIRONMENT,
  })
}

ReactDOM.render(<App />, document.getElementById('app'))
