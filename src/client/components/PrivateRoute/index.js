import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import RouterLoading from 'Components/RouterLoading'

export default function PrivateRoute({
  component: Component,
  user,
  profile,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.token ? (
          profile ? (
            <Component {...props} />
          ) : (
            <RouterLoading />
          )
        ) : (
          <Redirect
            to={{
              pathname: '/account/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}
