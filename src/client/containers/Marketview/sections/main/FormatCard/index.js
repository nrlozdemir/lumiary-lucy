import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketviewFormatCard } from 'Reducers/marketview'
import { ThemeContext } from 'ThemeContext/themeContext'
import RightArrowCircle from 'Components/Icons/RightArrowCircle'
import SingleVideoCard from 'Components/SingleVideoCard'
import style from 'Containers/Marketview/style.scss'
import formatStyles from './style.scss'

class FormatCard extends Component {
  componentDidMount() {
    this.props.getFormatChartRequest()
  }

  iconClass(name) {
    switch (name) {
      case 'LA':
      case 'Live Action':
        return 'icon-icon_liveaction'

      case 'AN':
      case 'Animation':
        return 'icon-icon_animation'

      case 'HY':
      case 'Hybrid':
      case 'Stop Motion':
        return 'icon-icon_stopmotion'

      case 'CG':
      case 'Cinemagraph':
        return 'icon-icon_cinemagraph'

      default:
        return null
    }
  }

  render() {
    const {
      formatChartData: { data, video, currentDay },
    } = this.props

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div
            className={style.marketViewCard}
            style={{
              backgroundColor: colors.modalBackground,
              color: colors.textColor,
            }}
          >
            <div className={style.marketViewCardTitle}>Format</div>
            <div className={style.marketViewCardSubTitle}>
              Performance Over Time
            </div>

            {!!currentDay && (
              <div className={style.chartSectionBadge}>
                <span
                  style={{
                    background: colors.labelBackground,
                    color: colors.labelColor,
                    boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                  }}
                >
                  On {currentDay}s
                </span>
              </div>
            )}
            <div className={style.videoContainer}>
              {video && (
                <SingleVideoCard
                  video={video}
                  muted={false}
                  options={{ size: 'auto', barColor: 'transparent' }}
                />
              )}
            </div>

            <div className={style.marketViewCardChartTitle}>Live Action</div>

            <div className={formatStyles.formatItems}>
              {data &&
                data.map((item, i) => (
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
            <Link
              to="/marketview/time"
              className={style.marketViewCardLink}
              style={{
                backgroundColor: colors.moduleBorder,
                color: colors.textColor,
              }}
            >
              View Time Metrics
              <div className={style.icon}>
                <RightArrowCircle />
              </div>
            </Link>
          </div>
        )}
      </ThemeContext.Consumer>
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
