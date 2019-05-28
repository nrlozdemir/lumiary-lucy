import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { makeSelectAuthProfile } from 'Reducers/auth'
import { actions, makeSelectTopPerformingFormat } from 'Reducers/panoptic'
import { chartCombineDataset, isDataSetEmpty } from 'Utils'

import LineAndDoughnutChartModule from 'Components/Modules/LineAndDoughnutChartModule'
import { lineChartData_DatasetOptions, lineChartOptions } from './options'
import { isEmpty } from 'lodash'
import { chartColors } from 'Utils/globals'

class TopPerformingFormat extends React.Component {
  componentDidMount() {
    this.props.getTopPerformingFormatData()
  }

  callBack = (data, moduleKey) => {
    this.props.getTopPerformingFormatData(data)
  }

  customCallbackFunc = () => console.log('Success')

  combineChartData = (lineData) => {
    return chartCombineDataset(lineData, lineChartData_DatasetOptions, {
      beforeDraw: function(chart, easing) {
        if (
          chart.config.options.chartArea &&
          chart.config.options.chartArea.backgroundColor
        ) {
          const ctx = chart.chart.ctx
          const chartArea = chart.chartArea

          ctx.save()
          ctx.fillStyle = chart.config.options.chartArea.backgroundColor
          ctx.fillRect(
            chartArea.left,
            chartArea.top,
            chartArea.right - chartArea.left,
            chartArea.bottom - chartArea.top
          )
          ctx.restore()
        }
      },
    })
  }

  render() {
    const {
      profile,
      topPerformingFormatData: {
        data,
        data: { doughnutData, percentageData, lineChartData },
        loading,
        error,
      },
    } = this.props

    const formatObj =
      !!profile &&
      !!profile.brand &&
      !!percentageData &&
      percentageData.data[profile.brand.name].format

    const percentageData =
      (!!formatObj &&
        Object.keys(formatObj).map((key, idx) => ({
          key,
          color: chartColors[idx],
          value: formatObj[key],
        }))) ||
      []

    const isFormatEmpty = isDataSetEmpty(lineChartData)

    const isDoughnutEmpty = isDataSetEmpty(doughnutData)

    const isPercentagesEmpty = isDataSetEmpty(percentageData)

    const hasNoData =
      !loading &&
      ((!!lineChartData &&
        isFormatEmpty &&
        !!doughnutData &&
        isDoughnutEmpty &&
        !!lineChartData &&
        isPercentagesEmpty) ||
        isEmpty(data))

    return (
      <LineAndDoughnutChartModule
        moduleKey="Panoptic/Top-Performing-Formats-This-Week-By-CV-Score"
        title="Top Performing Formats This Week By CV Score"
        action={this.callBack}
        lineChartData={lineChartData}
        lineChartOptions={lineChartOptions}
        customCallbackFunc={this.customCallbackFunc}
        filters={[
          {
            type: 'platform',
            selectKey: 'platform',
            placeHolder: 'Platforms',
            defaultValue: 'facebook',
          },
        ]}
        percentageData={percentageData}
        doughnutData={doughnutData}
        isEmpty={hasNoData}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  profile: makeSelectAuthProfile(),
  topPerformingFormatData: makeSelectTopPerformingFormat(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(TopPerformingFormat)
