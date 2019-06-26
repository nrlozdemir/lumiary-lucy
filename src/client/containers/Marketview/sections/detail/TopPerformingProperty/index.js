import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectMarketviewTopProperty,
  selectMarketviewTopPerformingPropertiesByCompetitorsDataView,
  selectMarketviewTopPerformingPropertiesDataView,
} from 'Reducers/marketview'
import BarChartModule from 'Components/Modules/BarChartModule'
import { getMinMaxFromDatasets } from 'Utils/datasets'

import style from '../../../style.scss'

class TopPerformingProperty extends React.Component {
  callback = (data) => {
    const {
      container,
      topProperty,
      getTopPerformingPropertiesRequest,
      getTopPerformingPropertiesByCompetitorsRequest,
    } = this.props

    if (container === 'competitor') {
      !!topProperty &&
        getTopPerformingPropertiesByCompetitorsRequest({
          ...data,
          property: topProperty,
        })
    } else if (container === 'platform') {
      getTopPerformingPropertiesRequest(data)
    }
  }

  componentDidUpdate(prevProps) {
    const { topProperty: prevTopProperty } = prevProps
    const {
      topProperty,
      getTopPerformingPropertiesByCompetitorsRequest,
    } = this.props

    if (!!topProperty && topProperty !== prevTopProperty) {
      getTopPerformingPropertiesByCompetitorsRequest({
        property: topProperty,
      })
    }
  }

  render() {
    const {
      title,
      filters,
      moduleKey,
      container,
      topPerformingPropertiesByCompetitorsData,
      topPerformingPropertiesData,
    } = this.props

    const chartData =
      container === 'competitor'
        ? topPerformingPropertiesByCompetitorsData.data
        : topPerformingPropertiesData.data

    const hasDatasets =
      !!chartData && !!chartData.datasets && !!chartData.datasets.length

    const max = (hasDatasets && getMinMaxFromDatasets(chartData.datasets)) || 0

    const min =
      (hasDatasets && getMinMaxFromDatasets(chartData.datasets, max, 'min')) ||
      0

    const stepSize = !!max && ~~(max / 4)

    const chartTickOptions = {
      min,
      max,
      stepSize,
      callback(value) {
        if (value < 1000) {
          return value
        } else if (value < 1000000) {
          return `${Math.round(value / 1000)}k`
        }
        return `${Math.round((value * 100) / 1000000) / 100}m`
      },
    }

    const referencesData =
      container === 'competitor'
        ? [
            {
              className: 'bg-cool-blue',
              text: 'Fast',
            },
            {
              className: 'bg-lighter-purple',
              text: 'Medium',
            },
            {
              className: 'bg-coral-pink',
              text: 'Slow',
            },
            {
              className: 'bg-cool-grey',
              text: 'Slowest',
            },
          ]
        : chartData &&
          chartData.datasets &&
          chartData.datasets.map((item) => ({
            text: item.label,
            color: item.backgroundColor,
          }))
    return (
      <BarChartModule
        moduleKey={moduleKey}
        title={title}
        containerClass={
          container === 'competitor' &&
          style.detailTopPerformingPropertyContainer
        }
        barData={chartData}
        tickOptions={chartTickOptions}
        height={50}
        action={this.callback}
        filters={filters}
        references={referencesData}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  topPerformingPropertiesByCompetitorsData: selectMarketviewTopPerformingPropertiesByCompetitorsDataView(),
  topPerformingPropertiesData: selectMarketviewTopPerformingPropertiesDataView(),
  topProperty: makeSelectMarketviewTopProperty(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(TopPerformingProperty)
