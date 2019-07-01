import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketviewTotalView } from 'Reducers/marketview'
import { makeSelectSelectFilters } from 'Reducers/selectFilters'

import StackedBarChart from 'Components/Charts/StackedBarChart'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import 'chartjs-plugin-datalabels'
import Module from 'Components/Module'

import { selectFiltersToType } from 'Utils'
import { isDataSetEmpty } from 'Utils/datasets'
import { chartColors, smallDayOfWeek } from 'Utils/globals'

import { isEmpty } from 'lodash'

class TotalViewsChart extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getTotalViewsRequest(data)
  }

  render() {
    const {
      selectFilters,
      totalViewsData: {
        data,
        loading,
        data: { barData, doughnutData },
      },
      infoText
    } = this.props

    const isDoughnutEmpty = isDataSetEmpty(doughnutData)
    const isBarChartEmpty = isDataSetEmpty(barData)

    const hasNoData =
      !loading &&
      ((!!doughnutData && isDoughnutEmpty && !!barData && isBarChartEmpty) ||
        isEmpty(data))

    const moduleKey = 'Marketview/StackedBarChart'
    const selects = selectFiltersToType(
      selectFilters.values && selectFilters.values[moduleKey]
    )
    const platform = selectFilters.options.platform.find(
      (platform) => selects.platform === platform.value
    )
    const metric = selectFilters.options.metric.find(
      (metric) => selects.metric === metric.value
    )

    if (barData) {
      barData.labels = barData.labels.map((day) => smallDayOfWeek[day])
    }

    return (
      <Module
        moduleKey={moduleKey}
        title={`Total ${metric ? metric.label : 'Views'} For ${
          platform ? platform.label : 'All Platforms'
        }`}
        action={this.callBack}
        infoText={infoText}
        filters={[
          {
            type: 'platformEngagement',
            selectKey: 'Mw-asd',
            placeHolder: 'Engagement by Platform',
          },
          {
            type: 'dateRange',
            selectKey: 'Mw-wds',
            placeHolder: 'Date',
          },
        ]}
        isEmpty={hasNoData}
        loading={loading}
      >
        <div className="grid-collapse">
          <div className="col-6 mt-24">
            <StackedBarChart barData={loading ? {} : barData} />
          </div>
          <div className="col-6">
            <DoughnutChart
              width={270}
              height={270}
              data={loading ? {} : doughnutData}
              cutoutPercentage={58}
              fillText="Total Percentage"
              dataLabelFunction="insertAfter"
              dataLabelInsert="%"
              labelPositionLeft
              labelsData={
                loading
                  ? []
                  : (!!doughnutData &&
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
  selectFilters: makeSelectSelectFilters(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(TotalViewsChart)
