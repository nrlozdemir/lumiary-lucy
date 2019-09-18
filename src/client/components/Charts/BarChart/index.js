import React from 'react'
import { Bar } from 'react-chartjs-2'
import { barDurationOptions } from './options'
import { withTheme } from 'ThemeContext/withTheme'
import { beforeDrawFunc } from 'Utils/chart-plugins'

const BarChart = (props) => {
  const {
    barDurationData,
    height = 290,
    width = 200,
    tickOptions = {},
    customChartOptions = {},
    themeContext: { colors },
  } = props

  const chartOptions = {
    ...barDurationOptions,
    ...customChartOptions,
    chartArea: {
      backgroundColor: colors.chartBackground,
    },
    scales: {
      xAxes: [
        {
          ...barDurationOptions.scales.xAxes[0],
          ticks: {
            ...barDurationOptions.scales.xAxes[0].ticks,
            fontColor: colors.textColor,
          },
          gridLines: {
            ...barDurationOptions.scales.xAxes[0].gridLines,
            color: colors.chartStadiumBarBorder,
          },
        },
      ],
      yAxes: [
        {
          ...barDurationOptions.scales.yAxes[0],
          ticks: {
            ...barDurationOptions.scales.yAxes[0].ticks,
            fontColor: colors.textColor,
            ...tickOptions,
          },
          gridLines: {
            ...barDurationOptions.scales.yAxes[0].gridLines,
            color: colors.chartStadiumBarBorder,
            zeroLineColor: colors.chartStadiumBarBorder,
          },
        },
      ],
    },
  }

  return (
    <Bar
      data={barDurationData}
      height={height}
      width={width}
      options={{ ...chartOptions }}
      plugins={[
        beforeDrawFunc({
          createBackground: true,
          strokeStyle: true,
        }),
      ]}
    />
  )
}

export default withTheme(BarChart)
