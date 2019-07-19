import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

// style and withTheme are only route list for quick switch route
import style from './style.scss'
import { withTheme } from 'ThemeContext/withTheme'

import RouterLoading from 'Components/RouterLoading'
import DynamicImport from 'Containers/DynamicImport'

const subPage = (page) => (props) => (
  <DynamicImport
    match={props.match}
    removeNavbar
    load={() => import('./sections/' + page)}
  >
    {(Component) =>
      Component === null ? <RouterLoading /> : <Component {...props} />
    }
  </DynamicImport>
)

const Login = subPage('login')
const ChangePassword = subPage('changePassword')
const Competitors = subPage('competitors')
const ForgotPassword = subPage('forgotPassword')
const Oauth = subPage('oauth')

class Account extends Component {
  render() {
    const {
      history,
      themeContext: { colors },
    } = this.props
    const list = [
      'login',
      'change-password',
      'competitors',
      'forgot-password',
      'oauth',
    ]
    return (
      <Switch>
        <Route path="/account/login" exact component={Login} />
        <Route
          path="/account/change-password"
          exact
          component={ChangePassword}
        />
        <Route path="/account/competitors" exact component={Competitors} />
        <Route
          path="/account/forgot-password"
          exact
          component={ForgotPassword}
        />
        <Route path="/account/oauth" exact component={Oauth} />
      </Switch>
    )
  }
}

export default withTheme(Account)
