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
    navigation: {
      level: 1,
      order: 3,
      title: 'Library',
    },
  },
  {
    path: '/library/build-report/:videoId',
    exact: true,
    component: 'BuildReport',
  },
  {
    path: '/library/:videoId',
    exact: true,
    component: 'LibraryDetail',
  },
  {
    path: '/quickview/all-platforms',
    exact: true,
    component: 'Quickview',
    navigation: {
      level: 1,
      order: 5,
      title: 'Quickview',
    },
  },
  {
    path: '/quickview/:platform',
    component: 'Quickview',
  },
  {
    path: '/panoptic',
    exact: true,
    component: 'Panoptic',
    navigation: {
      level: 1,
      order: 1,
      title: 'Panoptic',
    },
  },
  {
    path: '/audience',
    exact: true,
    component: 'Audience',
    navigation: {
      level: 1,
      order: 2,
      title: 'Audience',
    },
  },
  {
    path: '/marketview',
    exact: true,
    component: 'Marketview',
    navigation: {
      level: 1,
      order: 4,
      title: 'Marketview',
    },
  },
  {
    path: '/marketview/:detail',
    exact: true,
    component: 'Marketview',
  },
  {
    path: '/reports',
    exact: true,
    component: 'Reports',
    navigation: {
      level: 1,
      order: 6,
      title: 'Reports',
    },
  },
  {
    path: '/reports/brand-insight/:id',
    exact: true,
    component: 'Reports',
    navigation: {
      type: 'makeTitle',
      from: null,
      title: 'Brand Insights Saved Report',
      backToTitle: 'Generate New Report',
    },
  },
  {
    path: '/reports/brand-insight',
    exact: true,
    component: 'Reports',
    navigation: {
      type: 'makeTitle',
      loadComponent: true,
      category: 'Brands Insights',
      from: null,
      title: 'Brand Insights Report',
      backToTitle: 'Generate New Report',
    },
  },
  {
    path: '/reports/compare-brands/:id',
    exact: true,
    component: 'Reports',
    navigation: {
      type: 'makeTitle',
      from: null,
      title: 'Compare Brands Saved Report',
      backToTitle: 'Generate New Report',
    },
  },
  {
    path: '/reports/compare-brands',
    exact: true,
    component: 'Reports',
    navigation: {
      type: 'makeTitle',
      loadComponent: true,
      category: 'Compare Brands',
      from: null,
      title: 'Compare Brands Report',
      backToTitle: 'Generate New Report',
    },
  },
  {
    path: '/reports/predefined-reports/:id',
    exact: true,
    component: 'Reports',
    navigation: {
      type: 'makeTitle',
      from: null,
      title: 'Predefined Saved Reports',
      backToTitle: 'Generate New Report',
    },
  },
  {
    path: '/reports/predefined-reports',
    exact: true,
    component: 'Reports',
    navigation: {
      type: 'makeTitle',
      loadComponent: true,
      category: 'Predefined',
      from: null,
      title: 'Predefined Reports',
      backToTitle: 'Generate New Report',
    },
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
        match={props.match}
        routeConfig={routes}
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
