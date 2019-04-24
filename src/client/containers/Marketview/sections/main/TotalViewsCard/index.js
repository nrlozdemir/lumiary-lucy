import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketviewTotalView } from 'Reducers/marketview'

import StackedBarChart from 'Components/Charts/StackedBarChart'
import TotalViewsDoughnutChart from 'Components/Charts/MarketView/TotalViewsDoughnutChart'
import style from 'Containers/Marketview/style.scss'

import Module from 'Components/Module'

class TotalViewsChart extends React.Component {
  callBack = (data, moduleKey) => {
    if (moduleKey === 'StackedBarChart') {
      this.props.getTotalViewsRequest(data, moduleKey)
      // console.log('===> DATA: ', data, 'MODULE_KEY: ', moduleKey)
    }
  }

  render() {
    const {
      totalViewsData: { barData, doughnutData },
      callBack,
      moduleKey,
    } = this.props
    const chartContainer = classnames(
      'shadow-1 col-12-gutter-20 mb-48',
      style.chartContainer
    )

    // console.log('TOTAL CARD VIEW', this.props.totalViewsData)

    return (
      <Module
        moduleKey={'StackedBarChart'}
        title="Total Views For All Platforms In The Past Month"
        action={this.callBack}
        filters={[
          {
            type: 'platform',
            selectKey: 'Mw-asd',
            placeHolder: 'Platform',
          },
          {
            type: 'engagement',
            selectKey: 'Mw-sad',
            placeHolder: 'Engagement',
          },
          {
            type: 'timeRange',
            selectKey: 'Mw-wds',
            placeHolder: 'Date',
          },
        ]}
      >
        <div className="grid-collapse">
          <div className="col-6">
            {barData && <StackedBarChart barData={barData} />}
          </div>
          <div className="col-6">
            {doughnutData && (
              <TotalViewsDoughnutChart doughnutData={doughnutData} />
            )}
          </div>
        </div>
      </Module>
    )
  }
}

TotalViewsChart.propTypes = {
  totalViewsData: PropTypes.object,
}

TotalViewsChart.defaultProps = {
  totalViewsData: {
    barData: null,
    doughnutData: null,
  },
}

const mapStateToProps = createStructuredSelector({
  totalViewsData: makeSelectMarketviewTotalView(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(TotalViewsChart)
