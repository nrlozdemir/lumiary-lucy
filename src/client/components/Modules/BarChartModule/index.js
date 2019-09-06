import React from 'react'
import classnames from 'classnames'

import BarChart from 'Components/Charts/BarChart'
import Module from 'Components/Module'
import style from './style.scss'
import { isDataSetEmpty } from 'Utils/datasets'

const BarChartModule = ({
  barData,
  tickOptions,
  customChartOptions = {},
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
      if (value >= 1e9) {
        return (value / 1e9).toFixed(0).replace(/\.0$/, '') + 'g'
      }
      if (value >= 1e6) {
        return (value / 1e6).toFixed(0).replace(/\.0$/, '') + 'm'
      }
      if (value >= 1e3) {
        return (value / 1e3).toFixed(0).replace(/\.0$/, '') + 'k'
      }
      return value
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
              style.floatRight,
              {
                [style.minimizedLabels]: titleLabels && titleLabels.length > 4
              }
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
          customChartOptions={customChartOptions}
          width={width}
          height={height}
        />
      )}
    </Module>
  )
}

export default BarChartModule
