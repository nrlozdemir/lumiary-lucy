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
  infoText,
}) => {
  const { horizontalStackedBarData = {}, stadiumData } = data

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
      loading={loading}
      infoText={infoText}
    >
      <div className={style.pacingCardInner}>
        <MultipleNoDataModule>
          <HorizontalStackedBarChart
            width={500}
            height={340}
            barData={horizontalStackedBarData}
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
