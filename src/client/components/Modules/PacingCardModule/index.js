import React from 'react'
import PropTypes from 'prop-types'
import Module from 'Components/Module'
import HorizontalStackedBarChart from 'Components/Charts/HorizontalStackedBarChart'
import { barChartOptions } from './options'
import StadiumChart from 'Components/Charts/Panoptic/StadiumChart'
import { isEmpty } from 'lodash'
import { isDataSetEmpty } from 'Utils'
import style from './style.scss'

const PacingCardModule = ({
  data,
  moduleKey,
  title,
  action,
  filters,
  legend,
}) => {
  const { horizontalStackedBarData, stadiumData } = data

  const hasNoData =
    (isDataSetEmpty(horizontalStackedBarData) &&
      !!stadiumData &&
      horizontalStackedBarData.datasets.every((dataset) =>
        dataset.data.every((data) => data === 0)
      ) &&
      stadiumData.datasets.every((dataset) =>
        dataset.data.every((data) => data === 0)
      )) ||
    isEmpty(data)

  const stadiumValues =
    stadiumData &&
    stadiumData.datasets.map((item, idx) => ({
      title: item.label,
      value: item.data[idx] || 0,
      color: item.backgroundColor,
    }))

  return (
    <Module
      moduleKey={moduleKey}
      title={title}
      action={action}
      filters={filters}
      legend={legend}
      isEmpty={hasNoData}
    >
      <div className={style.pacingCardInner}>
        <div className={style.pacingCardInnerItem}>
          <HorizontalStackedBarChart
            width={500}
            height={340}
            barData={horizontalStackedBarData}
            options={barChartOptions}
          />
        </div>
        <div className={style.pacingCardInnerItem}>
          <StadiumChart data={stadiumValues} />
        </div>
      </div>
    </Module>
  )
}

PacingCardModule.propTypes = {
  data: PropTypes.any.isRequired,
  moduleKey: PropTypes.string.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  legend: PropTypes.object,
  filters: PropTypes.array,
}

export default PacingCardModule
