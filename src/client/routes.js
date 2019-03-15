import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import RouterLoading from 'Components/RouterLoading'
import DynamicImport from 'Containers/DynamicImport'

const routes = [
  {
    path: '/',
    exact: true,
    component: 'Library',
  },
  {
    path: '/library',
    exact: true,
    component: 'Library',
  },
  {
    path: '/audience',
    exact: true,
    removeNavbar: true,
    component: 'Audience',
  },
  {
    path: '/library/:videoId/compare',
    exact: true,
    removeNavbar: true,
    component: 'Compare',
  },
  {
    path: '/library/build-report/:videoId',
    exact: true,
    removeNavbar: true,
    component: 'BuildReport',
  },
  {
    path: '/library/:videoId',
    exact: true,
    removeNavbar: true,
    component: 'LibraryDetail',
  },
  {
    path: '/quickview',
    exact: true,
    component: 'Quickview',
  },
  {
    path: '/quickview/:id/:platform',
    component: 'Quickview',
  },
  {
    path: '/panoptic',
    exact: true,
    component: 'Panoptic',
  },
  {
    path: '/marketview',
    exact: true,
    component: 'Marketview',
  },
  {
    path: '/marketview/:detail',
    exact: true,
    removeNavbar: true,
    component: 'Marketview',
  },
  {
    path: '/reports',
    exact: true,
    component: 'Reports',
  },
  {
    path: '/reports/generated',
    exact: true,
    removeNavbar: true,
    component: 'ReportGenerated',
  },
  {
    path: '*',
    component: 'NotFound',
  },
]

const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    exact={route.exact}
    component={(props) => (
      <DynamicImport
        removeNavbar={route.removeNavbar}
        load={() => import(`./containers/${route.component}`)}
      >
        {(Component) =>
          Component === null ? (
            <RouterLoading />
          ) : (
              <Component {...props} match={props.match} />
            )
        }
      </DynamicImport>
    )}
  />
)

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    )
  }
}

Routes.propTypes = {}

export default withRouter(Routes)
