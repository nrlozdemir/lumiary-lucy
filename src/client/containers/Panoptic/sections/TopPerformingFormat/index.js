import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceDominantColor } from 'Reducers/panoptic'
import { chartCombineDataset } from 'Utils'

import LineAndDoughnutChartModule from 'Components/Modules/LineAndDoughnutChartModule'
import { lineChartData_DatasetOptions, lineChartOptions } from './options'

class TopPerformingFormat extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getAudienceDominantColorData(data)
  }

  customCallbackFunc = () => console.log('oldu')

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
    const lineData = {
      labels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      datasets: [
        { data: [10, 15, 17, 20, 17, 26, 28] },
        { data: [20, 25, 22, 27, 32, 30, 35] },
        { data: [30, 35, 50, 45, 40, 42, 48] },
        { data: [55, 60, 61, 65, 60, 62, 67] },
        { data: [82, 85, 78, 75, 80, 85, 90] },
      ],
    }

    return (
      <LineAndDoughnutChartModule
        moduleKey="Panoptic/Top-Performing-Formats-This-Week-By-CV-Score"
        title="Top Performing Formats This Week By CV Score"
        action={() => {}}
        lineChartData={this.combineChartData(lineData)}
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
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  audienceDominantColorData: makeSelectAudienceDominantColor(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(TopPerformingFormat)
