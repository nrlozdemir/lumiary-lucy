import 'chartjs-plugin-datalabels'
import { actions, makeSelectMarketviewTotalView } from 'Reducers/marketview'
import { chartColors } from 'Utils/globals'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isDataSetEmpty, percentageManipulation } from 'Utils/datasets'
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

  normalizeData(chartData = {}) {
    if(chartData.datasets && chartData.datasets.length) { 
      const datasets = chartData.datasets
      //find the factor
      const sum = datasets[0].data.reduce((accumulator, current) => { 
        return accumulator + current
       },0)
       const factor = 100 / sum

      //change the data related to highest value as percentages
      const newData = {
        ...chartData,
        datasets: datasets.map((dataset)=> {
          return {
            ...dataset,
            oldData: [...dataset.data],
            data: dataset.data.map((data) => {
              const percentage = factor * data
              return percentageManipulation(percentage)
            })
          }
        })
      }
      return newData
    }
    return chartData
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

    const shortLabels = labels.map((item) => {
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

    const longLabels = labels.map((item) => {
      switch(xAxisType) {
        case 'days':
          return moment().day(item).format("dddd")
        break;

        case 'weeks':
          return item
        break;

        case 'months':
          return moment().month(item).format("MMMM")
        break;
      }
    })

    const normalizedData = this.normalizeData(doughnutData)

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
              metricTitle={longLabels}
              barData={!loading ? {
                ...barData,
                labels: shortLabels
              } : null}
              barSpacing={2}
            />
          </div>
          <div className="col-6">
            <DoughnutChart
              width={290}
              height={290}
              data={loading ? {} : normalizedData}
              cutoutPercentage={58}
              fillText="Total Percentage"
              dataLabelFunction="insertAfter"
              dataLabelInsert="%"
              datasetsBorderWidth={0}
              tooltipMode="nearest"
              slicePiecesWidth={0.7}
              datasetOptions={{
                shadowOffsetX: 2,
                shadowOffsetY: 1.5,
                shadowBlur: 4,
                hoverShadowBlur: 4,
              }}
              layoutPadding={8}
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
