import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { withTheme } from 'ThemeContext/withTheme'
import {
  actions,
  //makeSelectMarketviewTopProperty,
  selectMarketviewTopPerformingPropertiesByCompetitorsDataView,
  selectMarketviewTopPerformingPropertiesDataView,
} from 'Reducers/marketview'
import { makeSelectSelectFilters } from 'Reducers/selectFilters'
import { ModuleComponent } from './components'

class TopPerformingProperty extends React.Component {
  constructor() {
    super()
    this.state = {
      topProperty: '',
    }
  }

  callback = (data) => {
    const {
      container,
      getTopPerformingPropertiesRequest,
      getTopPerformingPropertiesByCompetitorsRequest,
    } = this.props
    const { property = '' } = data
    this.setState({ topProperty: property })
    if (container === 'platform') {
      getTopPerformingPropertiesRequest(data)
    } else if (container === 'competitor') {
      getTopPerformingPropertiesByCompetitorsRequest(data)
    }
  }

  render() {
    return (
      <ModuleComponent
        props={this.props}
        state={this.state}
        callback={this.callback}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  topPerformingPropertiesByCompetitorsData: selectMarketviewTopPerformingPropertiesByCompetitorsDataView(),
  topPerformingPropertiesData: selectMarketviewTopPerformingPropertiesDataView(),
  //topProperty: makeSelectMarketviewTopProperty(),
  selectFilters: makeSelectSelectFilters(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default withTheme(compose(withConnect)(TopPerformingProperty))
