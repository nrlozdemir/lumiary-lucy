import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketview } from 'Reducers/marketview'

import style from './style.scss'
import classnames from 'classnames'

import RouterLoading from 'Components/RouterLoading'
import DynamicImport from 'Containers/DynamicImport'

const subPage = (page) => (props) => (
	<DynamicImport match={props.match} removeNavbar load={() => import('./views/' + page)}>
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
					<NavLink
						to="/marketview/platform"
						className={style.tab}
						activeClassName={classnames(style.tab, style.activeLink)}
					>
						Platform
          </NavLink>
					<NavLink
						to="/marketview/competitor"
						className={style.tab}
						activeClassName={style.activeLink}
					>
						Competitor
          </NavLink>
					<NavLink
						to="/marketview/time"
						className={style.tab}
						activeClassName={style.activeLink}
					>
						Time
          </NavLink>
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

Marketview.propTypes = {}

const mapStateToProps = createStructuredSelector({
	marketview: makeSelectMarketview(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)

export default compose(withConnect)(Marketview)
