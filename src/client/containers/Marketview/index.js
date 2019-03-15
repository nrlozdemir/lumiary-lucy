import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Route, Switch } from "react-router-dom"
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from "redux"
import { actions, makeSelectMarketview } from "Reducers/marketview"

import style from './style.scss'
import classnames from "classnames"

import RouterLoading from "Components/RouterLoading"
import DynamicImport from "Containers/DynamicImport"
import { Header } from './sections/Header';

const Detail = (props) => (
  <DynamicImport removeNavbar load={() => import('./views/detail')}>
    {(Component) => Component === null
      ? <RouterLoading />
      : (
        <React.Fragment>
          <Component {...props} />
        </React.Fragment>
      )}
  </DynamicImport>
)

const Main = (props) => (
  <DynamicImport removeNavbar load={() => import('./views/main')}>
    {(Component) => Component === null
      ? <RouterLoading />
      : <Component {...props} />}
  </DynamicImport>
)

/* eslint-disable react/prefer-stateless-function */
export class Marketview extends React.Component {
  render() {
    const { match } = this.props;
    console.log(match)
    return (
      <React.Fragment>
        {match.params.detail && (
          <Header />
        )}

        <div className="grid-container col-12">
          <div className={style.alignTabs}>
            <NavLink to="/marketview/platform" className={style.tab} activeClassName={classnames(style.tab, style.activeLink)}>
              Platform
            </NavLink>
            <NavLink to="/marketview/competitor" className={style.tab} activeClassName={style.activeLink}>
              Competitor
            </NavLink>
            <NavLink to="/marketview/time" className={style.tab}
              activeClassName={style.activeLink}>
              Time
            </NavLink>
          </div>

          <Switch>
            <Route
              path="/marketview"
              exact
              component={Main}
            />
            <Route
              path="/marketview/:detail"
              component={Detail}
            />
          </Switch>

        </div>
      </React.Fragment>
    )
  }
}

Marketview.propTypes = {}

const mapStateToProps = createStructuredSelector({
  marketview: makeSelectMarketview()
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Marketview)

