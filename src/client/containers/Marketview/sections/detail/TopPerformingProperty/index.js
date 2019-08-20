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
import {
  getMinMaxFromDatasets,
  getTopNValues,
  percentageManipulation,
} from 'Utils/datasets'
import { isArray, isNumber, isEqual } from 'lodash'

import style from '../../../style.scss'

const LEGEND_COLOR_ORDER = [
  '#2fd7c4',
  '#8562f3',
  '#5292e5',
  '#acb0be',
  '#505050',
]

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

    if (container === 'platform') {
      getTopPerformingPropertiesRequest(data)
    } else if (container === 'competitor') {
      const { property = '' } = data
      this.setState({ topProperty: property })
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

  normalizeData(chartData = {}) {
    if (chartData.datasets && chartData.datasets.length) {
      const datasets = chartData.datasets
      //find the highest data
      let flattenedArr = []
      datasets.forEach((dataset) => {
        flattenedArr = [...flattenedArr, ...dataset.data]
      })
      const highestValue = flattenedArr.reduce((accumulator, current) => {
        return current > accumulator ? current : accumulator
      }, 0)

      //change the data related to highest value as percentages
      const newData = {
        ...chartData,
        datasets: datasets.map((dataset) => {
          return {
            ...dataset,
            oldData: [...dataset.data],
            data: dataset.data.map((data) => {
              return percentageManipulation((data * 100) / highestValue)
            }),
          }
        }),
      }
      return newData
    }
    return chartData
  }

  render() {
    const { topProperty } = this.state
    const {
      title,
      filters,
      moduleKey,
      container,
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
    chartData = this.normalizeData(chartData)

    //commenting these logic since we will show percentages.

    // let elements = []
    // !!chartData.datasets &&
    // isArray(chartData.datasets) &&
    // chartData.datasets.length > 0 &&
    // chartData.datasets.map((e, i) => {
    //   !!e.data &&
    //   e.data.map((m, k) => {
    //     !!m && isNumber(m) && m > 0 && elements.push(m)
    //   })
    // })

    // const findMax = !!elements && Math.max(...elements)

    // const maxUp = (hasDatasets && findMax) || 0

    // const divider =
    //   !!maxUp &&
    //   Math.pow(10, parseInt(((Math.log(maxUp) * Math.LOG10E + 1) | 0) - 1))

    // const maxNumberCeil =
    //   !!maxUp &&
    //   !!divider &&
    //   Math.ceil(parseFloat((maxUp / divider).toFixed(2)))

    // const max = !!maxNumberCeil
    //   ? parseInt(
    //       (maxNumberCeil % 2 === 0 ? maxNumberCeil : maxNumberCeil + 1) *
    //         divider
    //     )
    //   : maxUp

    const min = 0
    const stepSize = 25
    const max = 100

    const chartTickOptions = {
      min,
      max,
      stepSize,
      callback(value) {
        return `${value}%`
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
            return `${count ? metricSuffix(count) : 0}% ${!!name && `| ${name}`}`
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
  //topProperty: makeSelectMarketviewTopProperty(),
  selectFilters: makeSelectSelectFilters(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default withTheme(compose(withConnect)(TopPerformingProperty))
