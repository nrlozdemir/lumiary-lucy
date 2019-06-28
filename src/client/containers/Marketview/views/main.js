import React, { Component } from 'react'

import ColorCard from 'Containers/Marketview/sections/main/ColorCard'
import PacingCard from 'Containers/Marketview/sections/main/PacingCard'
import FormatCard from 'Containers/Marketview/sections/main/FormatCard'
import TotalViewsCard from 'Containers/Marketview/sections/main/TotalViewsCard'
import TotalCompetitorCard from 'Containers/Marketview/sections/main/TotalCompetitorCard'

import style from '../style.scss'

class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={style.mainCardContainer}>
          <ColorCard />
          <PacingCard />
          <FormatCard />
        </div>

        <div className="grid-collapse">
          <TotalViewsCard />
          <TotalCompetitorCard />
        </div>
      </React.Fragment>
    )
  }
}

export default Main
