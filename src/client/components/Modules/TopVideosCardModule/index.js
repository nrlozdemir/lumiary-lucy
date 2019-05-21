import React from 'react'
import cx from 'classnames'

import StackedBarChart from 'Components/Charts/StackedBarChart'
import style from './style.scss'
import Module from 'Components/Module'

const TopVideosCard = (props) => {
  const {
    chartData,
    title,
    height,
    filters,
    references,
    moduleKey,
    action,
  } = props

  return (
    <Module
      title={title}
      filters={filters}
      references={references}
      moduleKey={moduleKey}
      action={action}
      isEmpty={
        !chartData ||
        !(
          chartData.datasets &&
          chartData.datasets[0] &&
          chartData.datasets[0].data &&
          chartData.datasets[0].data[0]
        )
      }
    >
      <div className="col-12-no-gutters">
        <StackedBarChart barData={chartData} height={height} />
      </div>
    </Module>
  )
}

export default TopVideosCard
