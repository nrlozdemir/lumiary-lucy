import React from 'react'
import { Bar } from 'react-chartjs-2'
import { randomKey } from 'Utils/index'

import { stackedChartOptions } from './options'

const plugins = [
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
    },
  },
]

class VerticalStackedBarChart extends React.Component {
  datasetKeyProvider() {
    return randomKey(5)
  }

  render() {
    const { data } = this.props
    return (
      <Bar
        width={590}
        height={360}
        backgroundColor="#242b49"
        data={data}
        datasetKeyProvider={this.datasetKeyProvider}
        options={{
          ...stackedChartOptions,
        }}
        plugins={plugins}
      />
    )
  }
}

export default VerticalStackedBarChart
