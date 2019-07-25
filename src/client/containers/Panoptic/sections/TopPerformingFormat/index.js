import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { makeSelectAuthProfile } from 'Reducers/auth'
import { actions, makeSelectTopPerformingFormat } from 'Reducers/panoptic'
import { chartCombineDataset, isDataSetEmpty } from 'Utils/datasets'

import LineAndDoughnutChartModule from 'Components/Modules/LineAndDoughnutChartModule'
import { lineChartData_DatasetOptions, lineChartOptions } from './options'
import { isEmpty } from 'lodash'
import { chartColors } from 'Utils/globals'

class TopPerformingFormat extends React.Component {
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
        data: { lineChartData = {}, average = 0, properties = {}, platform },
        loading,
        error,
      },
    } = this.props

    const isLineChartEmpty = isDataSetEmpty(lineChartData)

    const hasNoData =
      !loading && ((!!lineChartData && isLineChartEmpty) || isEmpty(data))
    return (
      <LineAndDoughnutChartModule
        moduleKey="Panoptic/TopPerformingPacingThisWeekByCVScore"
        title="Top Performing Pacing This Week By CV Score"
        action={this.callBack}
        lineChartData={lineChartData}
        lineChartOptions={lineChartOptions}
        customCallbackFunc={this.customCallbackFunc}
        filters={[
          {
            type: 'platformEngagement',
            selectKey: 'PVR-asd',
            placeHolder: 'Engagement by Platform',
          },
        ]}
        platform={platform}
        properties={properties}
        average={average}
        isEmpty={hasNoData}
        loading={loading}
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
