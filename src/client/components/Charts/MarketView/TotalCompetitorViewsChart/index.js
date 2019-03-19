import React from 'react'
import { Bar } from 'react-chartjs-2'
import { barDurationOptions } from './options'

const TotalCompetitorViewsChart = ({
  barDurationData,
  tickOptions = {},
  height = 100,
  width = 500,
}) => {
  const chartOptions = {
    ...barDurationOptions,
    scales: {
      ...barDurationOptions.scales,
      yAxes: [
        {
          ...barDurationOptions.scales.yAxes[0],
          ticks: {
            ...barDurationOptions.scales.yAxes[0].ticks,
            ...tickOptions,
          },
        },
      ],
    },
  }
  return (
    <Bar
      data={barDurationData}
      width={width}
      options={chartOptions}
      height={height}
    />
  )
}

export default TotalCompetitorViewsChart
