import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectMarketviewCompetitorView,
} from 'Reducers/marketview'
import BarChartModule from 'Components/Modules/BarChartModule'
import { withTheme } from 'ThemeContext/withTheme'

import { modifyTooltip } from 'Utils/tooltip'

import {
  isDataSetEmpty,
  getMinMaxFromDatasets,
  getStepsConsistently,
  percentageManipulation,
} from 'Utils/datasets'

class TotalCompetitorCard extends React.Component {
  componentDidMount() {
    this.props.getTotalCompetitorViewsRequest()
  }

  // _getNGreatest(dataSet, n) {
  //   function sumData(datum) {
  //     return datum.reduce((a, b) => a + b)
  //   }

  //   const sortedData = [...dataSet].sort(
  //     (datumA, datumB) => sumData(datumB.data) - sumData(datumA.data)
  //   )

  //   return sortedData.slice(0, n)
  // }

  normalizeData(chartData = {}) {
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
            normalData: [...dataset.data],
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

  render() {
    const {
      totalCompetitorViewsData: { data, loading },
      themeContext: { colors },
    } = this.props

    const isEmpty = isDataSetEmpty(data)

    //Second argument denotes how many elements you want to display. If you want all elements in dataset, omit second argument
    // const sortedDataSet =
    //   !!data.datasets && this._getNGreatest(data.datasets, 5)

    const hasDatasets = !!data && !!data.datasets && !!data.datasets.length

    // const max = (hasDatasets && getMinMaxFromDatasets(data.datasets)) || 0

    // const min = 0

    // const stepSize = !!max && getStepsConsistently(max)

    const chartTickOptions = {
      min: 0,
      max: 100,
      stepSize: 25,
      callback: function(value) {
        return value + '%'
      },
    }

    const chartData = this.normalizeData(data)
    const customChartOptions = hasDatasets && {
      tooltips: modifyTooltip({
        template: 'MarketviewCompetitorBarChartTemplate',
        data: chartData,
        metric: 'views',
        options: {
          background: colors.tooltipBackground,
          textColor: colors.tooltipTextColor,
          caretColor: colors.tooltipBackground,
        },
      }),
    }

    return (
      <BarChartModule
        moduleKey={'MarketView/TotalCompetitorViewsByDuration'}
        barData={!loading ? chartData : {}}
        title="Total Competitor Views By Duration"
        height={55}
        isEmpty={isEmpty}
        titleLabels={(hasDatasets && data.datasets.map((d) => d.label)) || []}
        tickOptions={chartTickOptions}
        customChartOptions={customChartOptions}
        loading={loading}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  totalCompetitorViewsData: makeSelectMarketviewCompetitorView(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default withTheme(compose(withConnect)(TotalCompetitorCard))
