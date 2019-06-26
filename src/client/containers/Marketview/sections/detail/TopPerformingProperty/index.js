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
import { makeSelectSelectFilters } from 'Reducers/selectFilters'

import BarChartModule from 'Components/Modules/BarChartModule'
import { splitCamelCaseToString, selectFiltersToType } from 'Utils'
import { getMinMaxFromDatasets } from 'Utils/datasets'
import { isEqual } from 'lodash'

import style from '../../../style.scss'

class TopPerformingProperty extends React.Component {
  callback = (data) => {
    const { container, getTopPerformingPropertiesRequest } = this.props

    if (container === 'platform') {
      getTopPerformingPropertiesRequest(data)
    }
  }

  componentDidUpdate(prevProps) {
    const { topProperty: prevTopProperty } = prevProps
    const {
      topProperty,
      container,
      moduleKey,
      selectFilters,
      getTopPerformingPropertiesByCompetitorsRequest,
    } = this.props

    if (
      container === 'competitor' &&
      ((!!prevProps.selectFilters &&
        !!selectFilters &&
        !isEqual(
          prevProps.selectFilters.values[prevProps.moduleKey],
          selectFilters.values[moduleKey]
        ) &&
        !!topProperty) ||
        prevTopProperty !== topProperty)
    ) {
      const selectFilterValues = selectFilters.values[moduleKey]

      const valuesToType = selectFiltersToType(selectFilterValues)

      getTopPerformingPropertiesByCompetitorsRequest({
        ...valuesToType,
        property: topProperty,
      })
    }
  }

  componentWillUnmount() {
    const { container, setCompetitorTopProperty } = this.props
    container === 'competitor' && setCompetitorTopProperty(null)
  }

  render() {
    const {
      title,
      filters,
      moduleKey,
      container,
      topProperty,
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
      chartData &&
      chartData.datasets &&
      chartData.datasets.map((item) => ({
        text: item.label,
        color: item.backgroundColor,
      }))

    return (
      <BarChartModule
        moduleKey={moduleKey}
        title={
          title
            ? title
            : `Top Performing Property, ${
                topProperty ? `${splitCamelCaseToString(topProperty)},` : ''
              } Across All Competitors`
        }
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
  selectFilters: makeSelectSelectFilters(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(TopPerformingProperty)
