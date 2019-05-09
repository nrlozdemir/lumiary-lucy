import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketviewFormatCard } from 'Reducers/marketview'

import style from 'Containers/Marketview/style.scss'
import formatStyles from './style.scss'

class FormatCard extends Component {
  componentDidMount() {
    this.props.getFormatChartRequest()
  }

  iconClass(name) {
    switch (name) {
      case 'Stop Motion':
        return 'icon-icon_stopmotion'

      case 'Animation':
        return 'icon-icon_animation'

      case 'Live Action':
        return 'icon-icon_liveaction'

      case 'Cinemagraph':
        return 'icon-icon_cinemagraph'

      default:
        return null
    }
  }

  render() {
    const { formatChartData } = this.props

    return (
      <div className={style.marketViewCard}>
        <div className={style.marketViewCardTitle}>Format</div>
        <div className={style.marketViewCardSubTitle}>
          Performance Over Time
        </div>
        <div className={style.marketViewCardDate}>
          <span>On Mondays</span>
        </div>

        <div className={style.hoverImage}>
          {formatChartData.hoverImages &&
            formatChartData.hoverImages.map((image, i) => (
              <img key={i} src={image} alt="" />
            ))}
        </div>

        <div className={style.marketViewCardChartTitle}>Stop Motion</div>

        <div className={formatStyles.formatItems}>
          {formatChartData.data &&
            formatChartData.data.map((item, i) => (
              <div key={i} className={formatStyles.formatItem}>
                <div className={formatStyles.formatItemIcon}>
                  <span className={this.iconClass(item.name)} />
                </div>
                <div className={formatStyles.formatItemText}>
                  <span>{item.count}</span>
                  <span>{item.name}</span>
                  <span>Categories</span>
                </div>
              </div>
            ))}
        </div>

        <div className={style.marketViewCardDescription}>
          Based on the number of shares for competitors across all platforms
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

const mapStateToProps = createStructuredSelector({
  formatChartData: makeSelectMarketviewFormatCard(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(FormatCard)
