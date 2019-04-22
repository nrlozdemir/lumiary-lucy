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
			title: 'Library'
		}
  },
  {
    path: '/library/:videoId/compare',
    exact: true,
    component: 'Compare',
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
    path: '/quickview',
    exact: true,
		component: 'Quickview',
		navigation: {
			level: 1,
			order: 5,
			title: 'Quickview'
		}
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
			title: 'Panoptic'
		}
  },
  {
    path: '/audience',
    exact: true,
    component: 'Audience',
		navigation: {
			level: 1,
			order: 2,
			title: 'Audience'
		}
  },
  {
    path: '/marketview',
    exact: true,
    component: 'Marketview',
		navigation: {
			level: 1,
			order: 4,
			title: 'Marketview'
		},
		routes: [
			{
				path: '/marketview/platform',
				exact: true,
				component: 'Marketview',
				navigation: {
					level: 2,
					order: 1,
					title: 'Platform'
				}
			},
			{
				path: '/marketview/competitor',
				exact: true,
				component: 'Marketview',
				navigation: {
					level: 2,
					order: 2,
					title: 'Competitor'
				}
			},
			{
				path: '/marketview/time',
				exact: true,
				component: 'Marketview',
				navigation: {
					level: 2,
					order: 3,
					title: 'Time'
				}
			}
		]
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
			title: 'Reports'
		}
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
