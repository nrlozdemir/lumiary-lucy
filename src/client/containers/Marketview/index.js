import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Route, Switch } from "react-router-dom"
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from "redux"
import { actions, makeSelectMarketview } from "Reducers/marketview"

import style from './style.scss'
import classnames from "classnames"

import Main from './views/main'
import Detail from './views/detail'

/* eslint-disable react/prefer-stateless-function */
export class Marketview extends React.Component {
  render() {
    return (
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
						render={() => <Main />}
					/>
					<Route path="/marketview/:detail" component={Detail} />
				</Switch>

      </div>
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

