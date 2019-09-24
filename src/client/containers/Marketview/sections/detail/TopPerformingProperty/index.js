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
import BarChartModule from 'Components/Modules/BarChartModule'
import {
  splitCamelCaseToString,
  //selectFiltersToType,
  customChartToolTip,
} from 'Utils'
import { getTopNValues, percentageManipulation } from 'Utils/datasets'
//import { isArray, isNumber, isEqual } from 'lodash'
import style from '../../../style.scss'

const LEGEND_COLOR_ORDER = [
  '#2fd7c4',
  '#8562f3',
  '#5292e5',
  '#acb0be',
  '#505050',
]

const customChartOptions = (colors) => {
  return {
    tooltips: customChartToolTip(colors, {
      callbacks: {
        title: () => '',
        label: (tooltipItem, data) => {
          const count =
            data &&
            data.datasets &&
            data.datasets[tooltipItem['datasetIndex']] &&
            data.datasets[tooltipItem['datasetIndex']].data[
              tooltipItem['index']
            ]
          const name =
            data &&
            data.datasets &&
            data.datasets[tooltipItem['datasetIndex']] &&
            data.datasets[tooltipItem['datasetIndex']].label
          return `${count ? count : 0}% ${!!name && `| ${name}`}`
        },
      },
    }),
  }
}

const referencesData = (chartData) => {
  return (
    chartData &&
    chartData.datasets &&
    chartData.datasets.map((item) => ({
      text: item.label,
      color: item.backgroundColor,
    }))
  )
}

const createTitle = (title, topProperty, container) => {
  return title
    ? title
    : `Top Performing ${
        topProperty ? `${splitCamelCaseToString(topProperty)},` : ''
      } Across All ${container === 'competitor' ? 'Competitors' : 'Platforms'}`
}

const chartTickOptions = () => {
  return {
    min: 0,
    max: 100,
    stepSize: 25,
    callback(value) {
      return `${value}%`
    },
  }
}

const normalizeData = (chartData = {}) => {
  if (chartData.datasets && chartData.datasets.length) {
    const { datasets, labels } = chartData
    //find the highest value for each group
    let highestValuesArr = []
    labels.forEach((item, index) => {
      highestValuesArr[index] = 0
      datasets.forEach((dataset) => {
        highestValuesArr[index] += dataset.data[index]
      })
    })

    //change the data related to highest value as percentages
    const newData = {
      ...chartData,
      datasets: datasets.map((dataset) => {
        return {
          ...dataset,
          oldData: [...dataset.data],
          data: dataset.data.map((data, i) => {
            const highestValue = highestValuesArr[i]
            return percentageManipulation((data * 100) / highestValue)
          }),
        }
      }),
    }
    return newData
  }
  return chartData
}

const createChartData = (data) => {
  if (!!data.datasets && !!data.datasets.length && data.datasets.length > 5) {
    const top5datasets = getTopNValues(data.datasets, 5)
    data = { ...data, datasets: top5datasets }
  }
  data = normalizeData(data)

  !!data &&
    !!data.datasets &&
    data.datasets.forEach((set, index) => {
      set.backgroundColor = LEGEND_COLOR_ORDER[index]
    })
  return data
}

const ModuleComponent = ({ props, state, callback }) => {
  const { topProperty } = state
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
  } = props

  const chartData = createChartData(
    container === 'competitor' ? compTopData : topData
  )

  return (
    <BarChartModule
      moduleKey={moduleKey}
      title={createTitle(title, topProperty, container)}
      containerClass={
        container === 'competitor' && style.detailTopPerformingPropertyContainer
      }
      barData={compTopLoading || topLoading ? {} : chartData}
      tickOptions={chartTickOptions()}
      customChartOptions={customChartOptions(colors)}
      height={50}
      action={callback}
      filters={filters}
      references={compTopLoading || topLoading ? [] : referencesData(chartData)}
      loading={compTopLoading || topLoading}
    />
  )
}

class TopPerformingProperty extends React.Component {
  constructor() {
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
