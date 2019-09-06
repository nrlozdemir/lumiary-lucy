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

import { randomKey, customChartToolTip, metricSuffix } from 'Utils'

import {
  isDataSetEmpty,
  getMinMaxFromDatasets,
  getStepsConsistently,
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

    const max = (hasDatasets && getMinMaxFromDatasets(data.datasets)) || 0

    const min = 0

    const stepSize = !!max && getStepsConsistently(max)

    const chartTickOptions = {
      min,
      max,
      stepSize,
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
            return `${count ? metricSuffix(count) : 0} Views ${!!name &&
              `| ${name}`}`
          },
        },
      }),
    }

    return (
      <BarChartModule
        moduleKey={'MarketView/TotalCompetitorViewsByDuration'}
        barData={!loading ? data : {}}
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
