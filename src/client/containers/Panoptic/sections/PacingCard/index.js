import React from 'react'
import classnames from 'classnames'

import style from './style.scss'

import SelectFilters from 'Components/SelectFilters'
import HorizontalStackedBarChart from 'Components/Charts/Panoptic/HorizontalStackedBarChart'
import StadiumChart from 'Components/Charts/Panoptic/StadiumChart'

const pacingCardContainer = classnames(
  'shadow-1 col-12 mt-72',
  style.pacingCardContainer
)

const PacingCard = ({
  barData,
  handleSelectFilters,
  selectDate,
  selectLikes,
}) => {
  return (
    <div className={pacingCardContainer}>
      <div className={style.componentTitle}>
        <span>Pacing For Each Format by Performance</span>
        <div className={style.selects}>
          <SelectFilters
            handleSelectFilters={handleSelectFilters}
            selectClasses="custom-select"
            selectDate={selectDate}
            selectLikes={selectLikes}
            selectLikesShow={true}
            selectDateShow={true}
          />
        </div>
      </div>
      <div className="col-6">
        <HorizontalStackedBarChart barData={barData} />
      </div>
      <div className="col-6">
        <StadiumChart />
      </div>
    </div>
  )
}

export default PacingCard
