import React from 'react'
import classnames from 'classnames'

import BarChart from 'Components/Charts/BarChart'
import Module from 'Components/Module'
import style from './style.scss'

const BarChartModule = ({
  barData,
  tickOptions,
  title,
  titleLabels,
  width,
  height,
  filters,
  action,
  moduleKey,
  references,
}) => {
  return (
    <Module
      moduleKey={moduleKey}
      title={title}
      filters={filters}
      action={action}
      references={references}
      legend={
        titleLabels && (
          <div
            className={classnames(
              style.colorListHorizontal,
              style.colorList,
              style.floatRight
            )}
          >
            {titleLabels.map((title, index) => (
              <div key={index} className={style.colorListItem}>
                {title}
              </div>
            ))}
          </div>
        )
      }
    >
      <div className="col-12-no-gutter">
        {barData && (
          <BarChart
            barDurationData={barData}
            tickOptions={tickOptions}
            width={width}
            height={height}
          />
        )}
      </div>
    </Module>
  )
}

export default BarChartModule
