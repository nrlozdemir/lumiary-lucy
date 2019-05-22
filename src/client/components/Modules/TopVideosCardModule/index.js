import React from 'react'
import cx from 'classnames'

import StackedBarChart from 'Components/Charts/StackedBarChart'
import style from './style.scss'
import Module from 'Components/Module'
import { isDataSetEmpty } from 'Utils'

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
      isEmpty={isDataSetEmpty(chartData)}
    >
      <div className="col-12-no-gutters">
        <StackedBarChart barData={chartData} height={height} />
      </div>
    </Module>
  )
}

export default TopVideosCard
