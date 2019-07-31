import 'chartjs-plugin-datalabels'
import { actions, makeSelectMarketviewTotalView } from 'Reducers/marketview'
import { chartColors } from 'Utils/globals'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isDataSetEmpty } from 'Utils/datasets'
import { isEmpty } from 'lodash'
import { makeSelectSelectFilters } from 'Reducers/selectFilters'
import { selectFiltersToType } from 'Utils'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import Module from 'Components/Module'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import StackedBarChart from 'Components/Charts/StackedBarChart'

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
    } = this.props

    const isDoughnutEmpty = isDataSetEmpty(doughnutData)
    const isBarChartEmpty = isDataSetEmpty(barData)

    const hasNoData =
      !loading &&
      ((!!doughnutData && isDoughnutEmpty && !!barData && isBarChartEmpty) ||
        isEmpty(data))

    const moduleKey = 'Marketview/TotalMetricForPlatform'
    const selects = selectFiltersToType(
      selectFilters.values && selectFilters.values[moduleKey]
    )
    const platform = selectFilters.options.platform.find(
      (platform) => selects.platform === platform.value
    )
    const metric = selectFilters.options.metric.find(
      (metric) => selects.metric === metric.value
    )

    const { labels = []} = barData || {}
    const dayNames = moment.weekdays()
    const monthNames = moment.months()
    
    let xAxisType =  'weeks'
    labels.map((l, i) => {
      dayNames.forEach((dItem, dIndex) => {
        if (dItem == l) {
          xAxisType = 'days'
        }
      })
      monthNames.forEach((mItem, mIndex) => {
        if (mItem == l) {
          xAxisType = 'months'
        }
      })
    })

    return (
      <Module
        moduleKey={moduleKey}
        title={`Total ${metric ? metric.label : 'Views'} For ${
          platform ? platform.label : 'All Platforms'
        }`}
        action={this.callBack}
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
          <div className="col-6">
            <StackedBarChart
              barData={!loading ? {
                ...barData,
                labels: labels.map((item) => {
                  switch(xAxisType) {
                    case 'days':
                      return moment().day(item).format("dd")
                    break;

                    case 'weeks':
                      return item
                    break;

                    case 'months':
                      return moment().month(item).format("MMM")
                    break;
                  }
                })
              } : null}
              barSpacing={2}
            />
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
