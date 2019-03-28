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
import RealSelectFilters from '../../components/RealSelectFilters';

const Detail = (props) => (
  <DynamicImport match={props.match} removeNavbar load={() => import('./views/detail')}>
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
      <DynamicImport match={props.match} removeNavbar load={() => import('./views/main')}>
        {(Component) =>
          Component === null ? (
            <RouterLoading />
          ) : (
              <Component match={props.match} {...props} quickviewItems={quickviewItems} />
            )
        }
      </DynamicImport>
    )

    return (
      <React.Fragment>
        <div className="grid-container col-12">
          <div className={style.headerContainer}>
            <div>
              <span className={style.dotItem}>
                <span className="bg-cool-blue" />
                Best Videos
              </span>
              <span className={style.dotItem}>
                <span className="bg-coral-pink" />
                Worst Videos
              </span>
            </div>
            <div>
              <h1 className="alpha color-white text-center font-primary text-bold">
                Quickview
              </h1>
            </div>
            <div className="headerRight">
							<RealSelectFilters type='aspectRatio' selectKey='fd' placeHolder='Select Aspect Ratio'/>
							<RealSelectFilters type='timeRange' selectKey='vali' placeHolder='Select Audience Gender'/>

            </div>
          </div>
          <Switch>
            <Route path="/quickview" exact component={Main} />
            <Route path="/quickview/:id/:platform" component={Detail} />
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
