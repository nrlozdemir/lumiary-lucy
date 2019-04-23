import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketview } from 'Reducers/marketview'

import ColorCard from 'Containers/Marketview/sections/main/ColorCard'
import PacingCard from 'Containers/Marketview/sections/main/PacingCard'
import FormatCard from 'Containers/Marketview/sections/main/FormatCard'
import TotalViewsCard from 'Containers/Marketview/sections/main/TotalViewsCard'
import TotalCompetitorViewsCard from 'Containers/Marketview/sections/main/TotalCompetitorViewsCardModule'
import style from '../style.scss'

const Main = () => {
  return (
    <React.Fragment>
      <div className={style.mainCardContainer}>
        <ColorCard />
        <PacingCard />
        <FormatCard />
      </div>

      <div className="grid-collapse">
        <TotalViewsCard />

        <TotalCompetitorViewsCard
					height={55}
          titleLabels={[
            'Barstool Sports',
            'SB Nation',
            'ESPN',
            'Scout Media',
            'Fansided',
          ]}
        />
      </div>
    </React.Fragment>
  )
}

export default Main
