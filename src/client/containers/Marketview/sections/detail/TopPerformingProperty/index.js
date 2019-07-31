import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { withTheme } from 'ThemeContext/withTheme'
import {
  actions,
  makeSelectMarketviewTopProperty,
  selectMarketviewTopPerformingPropertiesByCompetitorsDataView,
  selectMarketviewTopPerformingPropertiesDataView,
} from 'Reducers/marketview'
import { makeSelectSelectFilters } from 'Reducers/selectFilters'

import BarChartModule from 'Components/Modules/BarChartModule'
import {
  splitCamelCaseToString,
  selectFiltersToType,
  customChartToolTip,
  metricSuffix,
} from 'Utils'
import { getMinMaxFromDatasets, getTopNValues } from 'Utils/datasets'
import { isEqual } from 'lodash'

import style from '../../../style.scss'

const LEGEND_COLOR_ORDER = [
  '#2fd7c4',
  '#8562f3',
  '#5292e5',
  '#acb0be',
  '#505050',
]

class TopPerformingProperty extends React.Component {
  callback = (data) => {
    const {
      container,
      getTopPerformingPropertiesRequest,
      getTopPerformingPropertiesByCompetitorsRequest,
    } = this.props

    if (container === 'platform') {
      getTopPerformingPropertiesRequest(data)
    } else if (container === 'competitor') {
      getTopPerformingPropertiesByCompetitorsRequest(data)
    }
  }

  /* 
  This logic assumes that the property is set by the TopSimiliarProperties Module, which currently doesnt do it anymore, but when it does do it, then make it do it again
  */

  // componentDidUpdate(prevProps) {
  //   const { topProperty: prevTopProperty } = prevProps
  //   const {
  //     topProperty,
  //     container,
  //     moduleKey,
  //     selectFilters,
  //     getTopPerformingPropertiesByCompetitorsRequest,
  //   } = this.props

  // if (
  //   container === 'competitor' &&
  //   ((!!prevProps.selectFilters &&
  //     !!selectFilters &&
  //     !isEqual(
  //       prevProps.selectFilters.values[prevProps.moduleKey],
  //       selectFilters.values[moduleKey]
  //     ) &&
  //     !!topProperty) ||
  //     prevTopProperty !== topProperty)
  // ) {
  //   const selectFilterValues = selectFilters.values[moduleKey]

  //   const valuesToType = selectFiltersToType(selectFilterValues)

  //   getTopPerformingPropertiesByCompetitorsRequest({
  //     ...valuesToType,
  //     property: topProperty,
  //   })
  // }
  //}

  // componentWillUnmount() {
  //   const { container, setCompetitorTopProperty } = this.props
  //   container === 'competitor' && setCompetitorTopProperty(null)
  // }

  render() {
    const {
      title,
      filters,
      moduleKey,
      container,
      topProperty,
      themeContext: { colors },
      topPerformingPropertiesByCompetitorsData: {
        data: compTopData,
        loading: compTopLoading,
      },
      topPerformingPropertiesData: { data: topData, loading: topLoading },
    } = this.props

    let chartData = container === 'competitor' ? compTopData : topData

    const hasDatasets =
      !!chartData && !!chartData.datasets && !!chartData.datasets.length

    if (hasDatasets && chartData.datasets.length > 5) {
      const top5datasets = getTopNValues(chartData.datasets, 5)
      chartData = { ...chartData, datasets: top5datasets }
    }

    const max = (hasDatasets && getMinMaxFromDatasets(chartData.datasets)) || 0

    const min = 0

    const stepSize = !!max && max / 4

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

    const customChartOptions = {
      tooltips: customChartToolTip(colors, {
        callbacks: {
          title: () => '',
          label: function(tooltipItem, data) {
            const count =
              (data &&
                data.datasets &&
                data.datasets[tooltipItem['datasetIndex']] &&
                data.datasets[tooltipItem['datasetIndex']].data[
                  tooltipItem['index']
                ]) ||
              ''
            const name =
              (data &&
                data.datasets &&
                data.datasets[tooltipItem['datasetIndex']] &&
                data.datasets[tooltipItem['datasetIndex']].label) ||
              ''
            return `${count ? metricSuffix(count) : 0} ${!!name && `| ${name}`}`
          },
        },
      }),
    }

    ;((chartData && chartData.datasets) || []).forEach((set, index) => {
      set.backgroundColor = LEGEND_COLOR_ORDER[index]
    })

    const referencesData =
      chartData &&
      chartData.datasets &&
      chartData.datasets.map((item) => ({
        text: item.label,
        color: item.backgroundColor,
      }))

    const loading = compTopLoading || topLoading

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
        barData={loading ? {} : chartData}
        tickOptions={chartTickOptions}
        customChartOptions={customChartOptions}
        height={50}
        action={this.callback}
        filters={filters}
        references={loading ? [] : referencesData}
        loading={loading}
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

export default withTheme(compose(withConnect)(TopPerformingProperty))
