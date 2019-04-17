/**
 *
 * Quickview
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom'

import { actions, makeSelectQuickview } from 'Reducers/quickview'

import style from './style.scss'

import RouterLoading from 'Components/RouterLoading'
import DynamicImport from 'Containers/DynamicImport'
import RealSelectFilters from 'Components/RealSelectFilters'

const Detail = (props) => (
  <DynamicImport
    match={props.match}
    removeNavbar
    load={() => import('./views/detail')}
  >
    {(Component) =>
      Component === null ? <RouterLoading /> : <Component {...props} />
    }
  </DynamicImport>
)

export class Quickview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { getQuickviewItemsRequest } = this.props
    getQuickviewItemsRequest()
  }

  handleSelectFilters = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { selectLikes, selectDate } = this.state

    const {
      quickview: { quickviewItems: quickviewItems },
    } = this.props

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
              quickviewItems={quickviewItems}
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
            <Route path="/quickview/:platform" component={Detail} />
          </Switch>
        </div>
      </React.Fragment>
    )
  }
}

Quickview.propTypes = {
  dispatch: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  quickview: makeSelectQuickview(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Quickview)
