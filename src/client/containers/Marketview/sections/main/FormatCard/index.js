import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import style from 'Containers/Marketview/style.scss'
import formatStyles from './style.scss'

class ColorCard extends Component {
  render() {
    const { formatChartData } = this.props
    return (
      <div className={style.marketViewCard}>
        <div className={style.marketViewCardTitle}>Format</div>
        <div className={style.marketViewCardDescription}>
          Performance Over Time
        </div>
        <div className={style.marketViewCardDate}>
          <span>On Mondays</span>
        </div>

        <div className={style.hoverImage}>
          {formatChartData.hoverImages.map((image, i) => (
            <img key={i} src={image} alt="" />
          ))}
        </div>

        <div className={style.marketViewCardSubTitle}>Stop Motion</div>

        <div className={formatStyles.formatItems}>
          {formatChartData.data.map((item, i) => (
            <div key={i} className={formatStyles.formatItem}>
              <div className={formatStyles.formatItemIcon}>
                <span className={item.iconClass} />
              </div>
              <div className={formatStyles.formatItemText}>
                <span>{item.count}</span>
                <span>{item.name}</span>
                <span>categories</span>
              </div>
            </div>
          ))}
        </div>

        <div className={style.marketViewCardDescription}>
          Based on the number of likes for competitors across all platforms
        </div>
        <Link to="/marketview/time" className={style.marketViewCardLink}>
          View Time Metrics
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
