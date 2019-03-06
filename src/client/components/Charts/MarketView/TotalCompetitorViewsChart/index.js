import React from 'react'
import { Bar } from 'react-chartjs-2'
import { barDurationOptions } from './options'

const TotalCompetitorViewsChart = ({ barDurationData }) => {
  return(
    <Bar data={barDurationData} width={500} options={barDurationOptions} height={100} />
  )
}

export default TotalCompetitorViewsChart
