import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectReportsPerformanceComparison,
} from 'Reducers/reports'

//import cx from 'classnames'
import style from './style.scss'

//import ComparisonHorizontalBarChart from 'Components/ComparisonHorizontalBarChart'
import { Bar } from 'react-chartjs-2'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import 'chartjs-plugin-datalabels'
import { stackedChartOptions } from './options'
import { randomKey } from 'Utils/index'
import Module from 'Components/Module'

const barPlugins = [
  {
    beforeDraw: function(chart, easing) {
      if (
        chart.config.options.chartArea &&
        chart.config.options.chartArea.backgroundColor
      ) {
        var ctx = chart.chart.ctx
        var chartArea = chart.chartArea

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
      let configX = chart.config.options.scales.xAxes
      //Save the rendering context state
      ctx.save()
      ctx.strokeStyle = configX[0].gridLines.color
      ctx.lineWidth = configX[0].gridLines.lineWidth

      ctx.beginPath()
      ctx.moveTo(chart.chartArea.right, chart.chartArea.top)
      ctx.lineTo(chart.chartArea.right, chart.chartArea.bottom)
      ctx.stroke()

      //Restore the rendering context state
      ctx.restore()
    },
  },
]

const plugins = [
  {
    beforeDraw: function(chart) {
      const ctx = chart.chart.ctx
      const { top, bottom, left, right } = chart.chartArea
      ctx.save()
      ctx.fillStyle = '#FFFFFF'
      ctx.font = '14px ClanOTBold'
      ctx.fillText(
        'Total Percentage',
        (bottom - top) / 2 - 55,
        (right - left) / 2 + 4,
        right - left
      )
      ctx.restore()
    },
  },
]

class PerformanceComparison extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getPerformanceComparisonData(data)
  }
  datasetKeyProvider() {
    return randomKey(5)
  }
  render() {
    const {
      performanceComparisonData: { data, loading, error },
    } = this.props
    return (
      <Module
        moduleKey={'Reports/PerformanceComparison'}
        title="Property Performance Comparison"
        action={this.callBack}
        filters={[
          {
            type: 'pacing',
            selectKey: 'RPC-awaw',
            placeHolder: 'Pacing',
          },
          {
            type: 'engagement',
            selectKey: 'RPC-aqax',
            placeHolder: 'Engagement',
          },
        ]}
        legend={
          <div className={style.headerLabel}>
            <div
              className={
                'd-flex align-items-center justify-content-center ' +
                style.headerLabel
              }
            >
              <div className="d-flex align-items-center mr-32">
                <span className={style.redRound} />
                <p>Bleacher Report</p>
              </div>
              <div className="d-flex align-items-center mr-32">
                <span className={style.duskRound} />
                <p>Barstool Sports</p>
              </div>
            </div>
          </div>
        }
      >
        <div className={style.container}>
          {data && data.stackedChartData && (
            <div className={style.chartContainer}>
              <Bar
                width={720}
                height={340}
                data={data.stackedChartData}
                datasetKeyProvider={this.datasetKeyProvider}
                options={{
                  ...stackedChartOptions,
                }}
                plugins={barPlugins}
              />
            </div>
          )}
          {data && data.doughnutData && (
            <div className={style.chartContainer}>
              <DoughnutChart
                width={280}
                height={280}
                data={data.doughnutData}
                cutoutPercentage={58}
                fillText="Total Percentage"
                dataLabelFunction="insertAfter"
                dataLabelInsert="%"
              />
            </div>
          )}
        </div>
      </Module>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  performanceComparisonData: makeSelectReportsPerformanceComparison(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(PerformanceComparison)
