import React from 'react'
import BarChartModule from 'Components/Modules/BarChartModule'

import { randomKey } from 'Utils'

import { isDataSetEmpty, getMinMaxFromDatasets } from 'Utils/datasets'

const TotalCompetitorCard = ({
  totalCompetitorViewsData: { data, loading },
}) => {
  const isEmpty = isDataSetEmpty(data)

  const hasDatasets = !!data && !!data.datasets && !!data.datasets.length

  const max = (hasDatasets && getMinMaxFromDatasets(data.datasets)) || 0

  const min =
    (hasDatasets && getMinMaxFromDatasets(data.datasets, max, 'min')) || 0

  const stepSize = !!max && ~~(max / 4)

  const chartTickOptions = {
    min,
    max,
    stepSize,
  }

  return (
    <BarChartModule
      moduleKey={randomKey(10)}
      barData={data}
      title="Total Competitor Views By Duration"
      height={55}
      isEmpty={isEmpty}
      titleLabels={(hasDatasets && data.datasets.map((d) => d.label)) || []}
      tickOptions={chartTickOptions}
      loading={loading}
    />
  )
}

export default TotalCompetitorCard
