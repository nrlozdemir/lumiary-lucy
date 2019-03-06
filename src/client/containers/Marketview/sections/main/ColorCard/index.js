import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import style from 'Containers/Marketview/style.scss'

import BubleChart from 'Components/Charts/MarketView/BubleChart'
import { bubbleChartOptions } from './options'

class ColorCard extends Component {
  render() {
    const { bubleChartData } = this.props
    return (
      <div className={style.marketViewCard}>
        <div className={style.marketViewCardTitle}>Color</div>
        <div className={style.marketViewCardDescription}>
          Top Performing Platform
        </div>
        <div className={style.marketViewCardDate}>
          <span>Past 3 Months</span>
        </div>

        <div className={style.colors}>
          {bubbleChartOptions.map((color, i) => (
            <span key={i} style={{ backgroundColor: color }} />
          ))}
        </div>
        <BubleChart bubbleChartData={bubleChartData}/>
        <div className={style.marketViewCardDescription}>
          Based on the number of likes for competitors across all platforms
        </div>
        <Link to="/marketview/competitor" className={style.marketViewCardLink}>
          View Platform Metrics
          <div className={style.icon}>
            <span className="icon-Right-Arrow-Circle">
              <span className="path1" />
              <span className="path2" />
              <span className="path3" />
            </span>
          </div>
        </Link>
      </div>
    )
  }
}

export default ColorCard
