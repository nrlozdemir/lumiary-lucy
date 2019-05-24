import React from 'react'
import BarChartModule from 'Components/Modules/BarChartModule'

import { chartCombineDataset, randomKey } from 'Utils'
import { TotalCompetitor_DatasetOptions } from './options'

const TotalCompetitorCard = ({ data }) => {
  const combineData = chartCombineDataset(
    {
      labels: ['0-15s', '16-30s', '31-60s', '61s+'],
      datasets: data,
    },
    TotalCompetitor_DatasetOptions
  )

  return (
    <BarChartModule
      moduleKey={randomKey(10)}
      barData={combineData}
      title="Total Competitor Views By Duration"
      height={55}
      titleLabels={[
        'Barstool Sports',
        'SB Nation',
        'ESPN',
        'Scout Media',
        'Fanside',
      ]}
    />
  )
}

export default TotalCompetitorCard
