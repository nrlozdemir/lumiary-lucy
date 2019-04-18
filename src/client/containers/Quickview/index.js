/**
 *
 * Quickview
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import { Route, Switch } from 'react-router-dom'

import RouterLoading from 'Components/RouterLoading'
import DynamicImport from 'Containers/DynamicImport'

export class Quickview extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const Main = (props) => (
      <DynamicImport
        match={props.match}
        removeNavbar
        load={() => import('./views/main')}
      >
        {(Component) =>
          Component === null ? (
            <RouterLoading />
          ) : (
            <Component
              match={props.match}
              {...props}
            />
          )
        }
      </DynamicImport>
    )

    return (
      <React.Fragment>
        <div className="grid-container col-12">
          <Switch>
            <Route path="/quickview" exact component={Main} />
            <Route path="/quickview/:platform" component={Main} />
          </Switch>
        </div>
      </React.Fragment>
    )
  }
}

export default Quickview
