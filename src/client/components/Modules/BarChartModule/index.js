import React from 'react'
import classnames from 'classnames'

import BarChart from 'Components/Charts/BarChart'
import Module from 'Components/Module'
import style from './style.scss'
import { isDataSetEmpty } from 'Utils/datasets'

const BarChartModule = ({
  barData,
  tickOptions,
  title,
  titleLabels,
  references,
  width,
  height,
  filters,
  action,
  moduleKey,
  isEmpty,
  loading = false,
}) => {
  const chartTickOptions = {
    callback(value) {
      if (value < 1000) {
        return value
      } else if (value < 1000000) {
        return `${Math.round(value / 1000)}k`
      }
      return `${Math.round((value * 100) / 1000000) / 100}m`
    },
    ...tickOptions,
  }

  return (
    <Module
      moduleKey={moduleKey}
      title={title}
      filters={filters}
      action={action}
      references={references}
      isEmpty={isDataSetEmpty(barData)}
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
      loading={loading}
    >
      {!!barData && (
        <BarChart
          barDurationData={barData}
          tickOptions={chartTickOptions}
          width={width}
          height={height}
        />
      )}
    </Module>
  )
}

export default BarChartModule
