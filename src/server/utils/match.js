import { match, RouterContext } from 'react-router'
import store from '../../client/configureStore'
import { renderToString } from 'react-dom/server'
import routes from '../../client/routes'
import resolver from '../utils/resolver'
import errMsg from '../utils/error'
import React from 'react'
import { Provider } from 'react-redux'
import Helmet from 'react-helmet';

const matchRoute = (req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {

      Promise.all(resolver(renderProps.components, store.dispatch, renderProps.params))
        .then(() => {

          if(process.env.NODE_ENV == 'development') {
            try {
              res.render('index', {
                title: '<title>Lumiary Development</title>',
                meta: '<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">',
                link: '',
                ENV: process.env.NODE_ENV,
                state: JSON.stringify(store.getState()),
                //content: bodyContent
              })

            } catch(err) {
              res.render('error', errMsg(500, req.url, err))
            }

          } else {
              //render components
              const bodyContent = renderToString(
                <Provider store={store} key="provider">
                    <RouterContext {...renderProps} />
                </Provider>
              )

              //pick up title/meta/state change
              const head = Helmet.rewind()

              try {
                res.render('index', {
                  title: head.title.toString(),
                  meta: head.meta.toString(),
                  link: head.link.toString(),
                  ENV: process.env.NODE_ENV,
                  state: JSON.stringify(store.getState()),
                  content: bodyContent
                })

              } catch(err) {
                res.render('error', errMsg(500, req.url, err))
              }
          }
        })
        .catch((err) => {
          res.render('error', errMsg(err.status || 500, req.url, err))
        })
    } else {

      res.render('index', {
          title: '<title>QF</title>',
          meta: '<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">',
          link: '',
          ENV: process.env.NODE_ENV,
          state: JSON.stringify(store.getState()),
          //content: bodyContent
      })
    }
  })
}

export default matchRoute
