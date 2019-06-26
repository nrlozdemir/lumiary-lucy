import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectMarketviewCompetitorView,
} from 'Reducers/marketview'
import BarChartModule from 'Components/Modules/BarChartModule'

import { randomKey } from 'Utils'

import { isDataSetEmpty, getMinMaxFromDatasets } from 'Utils/datasets'

class TotalCompetitorCard extends React.Component {
  componentDidMount() {
    this.props.getTotalCompetitorViewsRequest()
  }

  render() {
    const {
      totalCompetitorViewsData: { data },
    } = this.props

    const isEmpty = isDataSetEmpty(data)

    const hasDatasets = !!data && !!data.datasets && !!data.datasets.length

    const max = (hasDatasets && getMinMaxFromDatasets(data.datasets)) || 0

    const min =
      (hasDatasets && getMinMaxFromDatasets(data.datasets, max, 'min')) || 0

    const stepSize = !!max && ~~(max / 4)

    const chartTickOptions = {
      min,
      max,
      stepSize,
    }

    return (
      <BarChartModule
        moduleKey={randomKey(10)}
        barData={data}
        title="Total Competitor Views By Duration"
        height={55}
        isEmpty={isEmpty}
        titleLabels={(hasDatasets && data.datasets.map((d) => d.label)) || []}
        tickOptions={chartTickOptions}
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

export default compose(withConnect)(TotalCompetitorCard)
