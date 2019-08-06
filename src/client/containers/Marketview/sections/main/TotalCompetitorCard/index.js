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

import { isDataSetEmpty, getMinMaxFromDatasets } from 'Utils/datasets'

class TotalCompetitorCard extends React.Component {
  componentDidMount() {
    this.props.getTotalCompetitorViewsRequest()
  }

  render() {
    const {
      totalCompetitorViewsData: { data, loading },
      themeContext: { colors },
    } = this.props

    const isEmpty = isDataSetEmpty(data)

    const hasDatasets = !!data && !!data.datasets && !!data.datasets.length

    const max = (hasDatasets && getMinMaxFromDatasets(data.datasets)) || 0

    const min = 0

    const stepSize = !!max && ~~(max / 4)

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
