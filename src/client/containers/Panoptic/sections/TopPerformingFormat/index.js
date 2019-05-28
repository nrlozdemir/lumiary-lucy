import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectTopPerformingFormat } from 'Reducers/panoptic'
import { chartCombineDataset, isDataSetEmpty } from 'Utils'

import LineAndDoughnutChartModule from 'Components/Modules/LineAndDoughnutChartModule'
import { lineChartData_DatasetOptions, lineChartOptions } from './options'
import { isEmpty } from 'lodash'

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
      topPerformingFormatData: { data, loading, error },
    } = this.props

    console.log('lineanddonuts', data)

    const hasNoData =
      !loading && ((!!data && isDataSetEmpty(data)) || isEmpty(data))

    const doughnutData = {
      labels: [
        'Live Action',
        'Animation 2',
        'Stop Motion',
        'Animation',
        'Cinemagraph',
      ],
      datasets: [
        {
          data: [5, 15, 25, 10, 45],
          backgroundColor: [
            '#5292e5',
            '#545b79',
            '#acb0be',
            '#2fd7c4',
            '#8562f3',
          ],
          hoverBackgroundColor: [
            '#5292e5',
            '#545b79',
            '#acb0be',
            '#2fd7c4',
            '#8562f3',
          ],
        },
      ],
    }

    const percentageData = [
      {
        value: 33.5,
        key: 'Live Action',
        color: 'purple',
      },
      {
        value: 60.1,
        key: 'Animation',
        color: 'green',
      },
      {
        value: 72.5,
        key: 'Animation 2',
        color: 'blue',
      },
      {
        value: 50.2,
        key: 'Stop Motion',
        color: 'lightGrey',
      },
      {
        value: 85.3,
        key: 'Cinemagraph',
        color: 'grey',
      },
    ]
    
    return (
      <LineAndDoughnutChartModule
        moduleKey="Panoptic/Top-Performing-Formats-This-Week-By-CV-Score"
        title="Top Performing Formats This Week By CV Score"
        action={this.callBack}
        lineChartData={data}
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
  topPerformingFormatData: makeSelectTopPerformingFormat(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(TopPerformingFormat)
