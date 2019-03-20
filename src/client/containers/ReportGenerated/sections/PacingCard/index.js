import React from 'react'
import classnames from 'classnames'

import style from './style.scss'

import HorizontalStackedBarChart from 'Components/Charts/Panoptic/HorizontalStackedBarChart'
import StadiumChart from 'Components/Charts/Panoptic/StadiumChart'

const pacingCardContainer = classnames('shadow-1', style.pacingCardContainer)

const PacingCard = ({ barData }) => {
  return (
    <div className={pacingCardContainer}>
      <div className={style.componentTitle}>
        <span>Pacing For Each Format by Performance</span>
      </div>
      <div className={style.pacingCardInner}>
        <div className={style.pacingCardInnerItem}>
          <HorizontalStackedBarChart barData={barData} />
        </div>
        <div className={style.pacingCardInnerItem}>
          <StadiumChart />
        </div>
      </div>
    </div>
  )
}

export default PacingCard
