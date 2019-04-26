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
  if (!chartData) {
    return null
  }
  return (
    <Module
      title={title}
      filters={filters}
      references={references}
      moduleKey={moduleKey}
      action={action}
    >
      <div className="col-12-no-gutter">
        <StackedBarChart barData={chartData} height={height} />
      </div>
    </Module>
  )
}

export default TopVideosCard
