import basicAuth from 'express-basic-auth'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Routes from '../../client/routes'
import store from '../../client/configureStore'
import { Provider } from 'react-redux'
import Helmet from 'react-helmet'

const cache = require('express-redis-cache')({
  host: process.env.REDIS_HOST,
})

cache.del('*', (error, numDeleted) =>
  console.log(`Deleted ${numDeleted} cache entries.`)
) // Force-clear cache on app startup

module.exports = (app) => {
  // HEALTH
  // =============================================================================
  app.use(
    '/healthcheck',
    require('express-healthcheck')({
      healthy: function() {
        return { status: 'upppp' }
      },
    })
  )

  if (
    process.env.ENVIRONMENT === 'qa' ||
    process.env.ENVIRONMENT === 'staging'
  ) {
    app.use(
      basicAuth({
        users: {
          [process.env.BASIC_AUTH_USER]: process.env.BASIC_AUTH_PASSWORD,
        },
        challenge: true,
      })
    )
  }

  app.get(
    '/*',
    cache.route({
      prefix: 'lumiere',
    }),
    (req, res) => {
      const context = {}
      const head = Helmet.rewind()

      //render components
      const reactDom = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <Routes />
          </StaticRouter>
        </Provider>
      )

      if (context.status === 404) {
        res.status(404)
      }

      res.render('index', {
        title: head.title.toString(),
        meta: head.meta.toString(),
        link: head.link.toString(),
        ENV: process.env.NODE_ENV,
        state: JSON.stringify(store.getState()),
        content: reactDom,
      })
    }
  )
}
