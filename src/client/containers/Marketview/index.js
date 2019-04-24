import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Route, Switch } from 'react-router-dom'
import style from './style.scss'
import classnames from 'classnames'

import RouterLoading from 'Components/RouterLoading'
import DynamicImport from 'Containers/DynamicImport'

const subPage = (page) => (props) => (
  <DynamicImport
    match={props.match}
    removeNavbar
    load={() => import('./views/' + page)}
  >
    {(Component) =>
      Component === null ? <RouterLoading /> : <Component {...props} />
    }
  </DynamicImport>
)

const Platform = subPage('platform')
const Competitor = subPage('competitor')
const Time = subPage('time')
const Main = subPage('main')

/* eslint-disable react/prefer-stateless-function */
export class Marketview extends React.Component {
  render() {
    return (
      <div className="grid-container col-12">
        <div className={style.alignTabs}>

        </div>

        <Switch>
          <Route path="/marketview" exact component={Main} />
          <Route path="/marketview/platform" exact component={Platform} />
          <Route path="/marketview/competitor" exact component={Competitor} />
          <Route path="/marketview/time" exact component={Time} />
        </Switch>
      </div>
    )
  }
}

export default Marketview
