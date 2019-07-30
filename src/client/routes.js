import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'

import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { actions as appActions, makeSelectGlobalSection } from 'Reducers/app'
import {
  actions as authActions,
  makeSelectAuthUser,
  makeSelectAuthProfile,
} from 'Reducers/auth'

import RouterLoading from 'Components/RouterLoading'
import DynamicImport from 'Containers/DynamicImport'
import PrivateRoute from 'Components/PrivateRoute'

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
    path: '/quickview/facebook',
    exact: true,
    component: 'Quickview',
    navigation: {
      level: 1,
      order: 5,
      title: 'Quickview',
    },
  },
  {
    path: '/quickview/:platform/:metric/:dateRange',
    component: 'Quickview',
    navigation: {
      type: 'dynamicActive', // if have dynamic route, need to this for active border, but both of component name must be same
    },
  },
  {
    path: '/quickview/:platform/:metric',
    component: 'Quickview',
    navigation: {
      type: 'dynamicActive',
    },
  },
  {
    path: '/quickview/:platform',
    component: 'Quickview',
    navigation: {
      type: 'dynamicActive',
    },
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
    backToTitle: 'Back To Overview',
    exact: true,
    component: 'Marketview',
    routes: [
      {
        path: '/marketview/platform',
        exact: true,
        component: 'Marketview',
        navigation: {
          level: 2,
          order: 1,
          title: 'Platform',
        },
      },
      {
        path: '/marketview/competitor',
        exact: true,
        component: 'Marketview',
        navigation: {
          level: 2,
          order: 2,
          title: 'Competitor',
        },
      },
      {
        path: '/marketview/time',
        exact: true,
        component: 'Marketview',
        navigation: {
          level: 2,
          order: 3,
          title: 'Time',
        },
      },
    ],
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
    path: '/glossary/:letter/:term',
    exact: true,
    component: 'Glossary',
  },
  {
    path: '/glossary/:letter',
    exact: true,
    component: 'Glossary',
  },
  {
    path: '/glossary',
    exact: true,
    component: 'Glossary',
  },
  {
    path: '/sso',
    exact: true,
    component: 'SSO',
    navbarOff: true,
  },
  {
    path: '/account/login',
    exact: true,
    component: 'Account',
    navbarOff: true,
    notPrivateRoute: true,
  },
  {
    path: '/account/change-password',
    exact: true,
    component: 'Account',
    navbarOff: true,
    notPrivateRoute: true,
  },
  {
    path: '/account/competitors',
    exact: true,
    component: 'Account',
    navbarOff: true,
  },
  {
    path: '/account/forgot-password',
    exact: true,
    component: 'Account',
    navbarOff: true,
    notPrivateRoute: true,
  },
  {
    path: '/account/oauth',
    exact: true,
    component: 'Account',
    navbarOff: true,
  },
  {
    path: '*',
    component: 'NotFound',
    navbarOff: true,
  },
]

const RouteWithSubRoutes = (route) => {
  const body = (props) => (
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
  )

  return route.path !== '/sso' ? (
    route.notPrivateRoute ? (
      route.user && route.user.token ? (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      ) : (
        <Route
          path={route.path}
          exact={route.exact}
          component={(props) => body(props)}
        />
      )
    ) : (
      <PrivateRoute
        path={route.path}
        exact={route.exact}
        user={route.user}
        profile={route.profile}
        component={(props) => body(props)}
      />
    )
  ) : (
    <Route
      path={route.path}
      exact={route.exact}
      component={(props) => body(props)}
    />
  )
}

class Routes extends React.Component {
  componentDidUpdate(prevProps) {
    const {
      user,
      profile,
      sections,
      getProfileRequest,
      getSectionExplanationsRequest,
    } = this.props

    const profileLStore = window.localStorage.getItem('profile')
    const sectionsLStore = window.localStorage.getItem('sections')

    const profileStore =
      profileLStore && profileLStore !== 'null' && profileLStore !== 'undefined'
        ? JSON.parse(profileLStore)
        : {}

    const sectionsStore =
      sectionsLStore &&
      sectionsLStore !== 'null' &&
      sectionsLStore !== 'undefined'
        ? JSON.parse(sectionsLStore)
        : {}

    if (prevProps.user && user.token && prevProps.user.token !== user.token) {
      if (
        !Object.keys(sectionsStore).length ||
        (Object.keys(sectionsStore).length && !sectionsStore.data)
      ) {
        !!profile && getSectionExplanationsRequest()
      }

      if (!Object.keys(profileStore).length && !profile) {
        getProfileRequest({ token: user.token })
      }
    }

    if (prevProps.sections !== sections) {
      window.localStorage.setItem('sections', JSON.stringify(sections))
    }

    if (prevProps.user !== user) {
      window.localStorage.setItem('user', JSON.stringify(user))
    }

    if (prevProps.profile !== profile) {
      window.localStorage.setItem('profile', JSON.stringify(profile))
    }
  }

  render() {
    const { user, profile } = this.props
    return (
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes
            key={i}
            {...route}
            user={user}
            profile={profile}
          />
        ))}
      </Switch>
    )
  }
}

Routes.propTypes = {}

const mapStateToProps = createStructuredSelector({
  sections: makeSelectGlobalSection(),
  user: makeSelectAuthUser(),
  profile: makeSelectAuthProfile(),
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...appActions, ...authActions }, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(withRouter(Routes))
