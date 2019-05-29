import React from 'react'
import BarChartModule from 'Components/Modules/BarChartModule'

import { chartCombineDataset, randomKey, isDataSetEmpty } from 'Utils'
import { TotalCompetitor_DatasetOptions } from './options'

const TotalCompetitorCard = ({ data }) => {
  const combineData = chartCombineDataset(
    {
      labels: ['0-15s', '16-30s', '31-60s', '61s+'],
      datasets: data.datasets,
    },
    TotalCompetitor_DatasetOptions
  )
  const isEmpty = isDataSetEmpty(combineData)
  return (
    <BarChartModule
      moduleKey={randomKey(10)}
      barData={combineData}
      title="Total Competitor Views By Duration"
      height={55}
      isEmpty={isEmpty}
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
