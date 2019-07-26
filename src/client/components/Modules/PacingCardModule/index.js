import React from 'react'
import PropTypes from 'prop-types'
import Module from 'Components/Module'
import HorizontalStackedBarChart from 'Components/Charts/HorizontalStackedBarChart'
import { barChartOptions } from './options'
import StadiumChart from 'Components/Charts/Panoptic/StadiumChart'
import MultipleNoDataModule from 'Components/MultipleNoDataModule'
import style from './style.scss'
import { isDataSetEmpty } from 'Utils/datasets'

const PacingCardModule = ({
  data,
  moduleKey,
  title,
  action,
  filters,
  legend,
  loading = false,
}) => {
  const { horizontalStackedBarData = {}, stadiumData, horizontalStackedBarDataOriginal = {} } = data

  for (const _data of (horizontalStackedBarData &&
    horizontalStackedBarData.datasets) ||
    []) {
    if (!_data.hoverBackgroundColor) {
      delete _data.hoverBackgroundColor
    }
  }

  const stadiumValues =
    stadiumData &&
    stadiumData.datasets.map((item, idx) => ({
      title: item.label,
      value: item.data[idx] || 0,
      color: item.backgroundColor,
    }))
  
  const horizontalBarChartValues = { ...stadiumValues }

  return (
    <Module
      moduleKey={moduleKey}
      title={title}
      action={action}
      filters={filters}
      legend={legend}
      loading={loading}
    >
      <div className={style.pacingCardInner}>
        <MultipleNoDataModule>
          <HorizontalStackedBarChart
            width={500}
            height={340}
            barData={horizontalStackedBarData}
            stadiumValues={stadiumValues}
            horizontalStackedBarDataOriginal={horizontalStackedBarDataOriginal}
            values={horizontalBarChartValues}
            options={barChartOptions}
            datasetsIsEmpty={isDataSetEmpty(horizontalStackedBarData)}
          />
          <StadiumChart
            data={stadiumValues}
            datasetsIsEmpty={isDataSetEmpty(stadiumData)}
          />
        </MultipleNoDataModule>
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
