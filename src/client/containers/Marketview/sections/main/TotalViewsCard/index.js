import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketviewTotalView } from 'Reducers/marketview'

import StackedBarChart from 'Components/Charts/StackedBarChart'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import style from './style.scss'
import 'chartjs-plugin-datalabels'
import Module from 'Components/Module'

import { chartCombineDataset, isDataSetEmpty } from 'Utils/datasets'
import { chartColors } from 'Utils/globals'

import { isEmpty, isEqual } from 'lodash'

class TotalViewsChart extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getTotalViewsRequest(data)
  }

  shouldComponentUpdate(nextProps) {
    const {
      totalViewsData: { data: nextData },
    } = nextProps

    const {
      totalViewsData: { data },
    } = this.props

    return !isEqual(nextData, data)
  }

  render() {
    const {
      totalViewsData: {
        data,
        loading,
        data: { barData, doughnutData },
      },
    } = this.props

    const isDoughnutEmpty = isDataSetEmpty(doughnutData)
    const isBarChartEmpty = isDataSetEmpty(barData)
    
    const hasNoData =
      (!loading &&
        (!!doughnutData && isDoughnutEmpty && !!barData && isBarChartEmpty)) ||
      isEmpty(data)

    return (
      <Module
        moduleKey={'StackedBarChart'}
        title="Total Views For All Platforms"
        action={this.callBack}
        filters={[
          {
            type: 'platform',
            selectKey: 'Mw-asd',
            placeHolder: 'Platform',
          },
          {
            type: 'metric',
            selectKey: 'Mw-sad',
            placeHolder: 'Engagement',
          },
          {
            type: 'dateRange',
            selectKey: 'Mw-wds',
            placeHolder: 'Date',
          },
        ]}
        isEmpty={hasNoData}
      >
        <div className="grid-collapse">
          <div className="col-6 mt-24">
            <StackedBarChart barData={barData} />
          </div>
          <div className="col-6">
            <DoughnutChart
              width={270}
              height={270}
              data={doughnutData}
              cutoutPercentage={58}
              fillText="Total Percentage"
              dataLabelFunction="insertAfter"
              dataLabelInsert="%"
              labelPositionLeft
              labelsData={
                (!!doughnutData &&
                  doughnutData.labels.map((label, idx) => ({
                    data: label,
                    color: chartColors[idx],
                  }))) ||
                []
              }
            />
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
