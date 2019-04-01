import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketviewTotalView } from 'Reducers/marketview'

import TotalViewsBarChart from 'Components/Charts/MarketView/TotalViewsBarChart'
import TotalViewsDoughnutChart from 'Components/Charts/MarketView/TotalViewsDoughnutChart'
import SelectFilters from 'Components/SelectFilters'
import style from 'Containers/Marketview/style.scss'

import Module from 'Components/Module'

class TotalViewsChart extends React.Component {
  callBack = (data, moduleKey) => {
    if (moduleKey === 'TotalViewsBarChart') {
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
        moduleKey={'TotalViewsBarChart'}
        title="Total Views For All Platforms In The Past Month"
        action={this.callBack}
        filters={[
          {
            type: 'platform',
            selectKey: 'Mw-asd',
            placeHolder: 'place holder',
          },
          {
            type: 'engagement',
            selectKey: 'Mw-sad',
            placeHolder: 'place holder',
          },
          {
            type: 'timeRange',
            selectKey: 'Mw-wds',
            placeHolder: 'place holder',
          },
        ]}
      >
        <div className="grid-collapse">
          <div className="col-6">
            {barData && <TotalViewsBarChart barData={barData} />}
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
