import React from 'react'
import classnames from 'classnames'

import BarChart from 'Components/Charts/BarChart'
import Module from 'Components/Module'
import style from './style.scss'
import { isDataSetEmpty } from 'Utils/datasets'
import { numberFormatter } from 'Utils/index'

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
      return numberFormatter(value)
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
          customChartOptions={customChartOptions}
          width={width}
          height={height}
        />
      )}
    </Module>
  )
}

export default BarChartModule
