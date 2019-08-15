import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketviewFormatCard } from 'Reducers/marketview'
import { ThemeContext } from 'ThemeContext/themeContext'
import RightArrowCircle from 'Components/Icons/RightArrowCircle'
import SingleVideoCard from 'Components/SingleVideoCard'
import style from 'Containers/Marketview/style.scss'
import formatStyles from './style.scss'
import RouterLoading from 'Components/RouterLoading'
import { isEmpty } from 'lodash'
import { metricSuffix } from 'Utils'
import { dateRangeLabels } from 'Utils/globals'

class FormatCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateRange: '3months',
      metric: 'views',
    }
  }

  componentDidMount() {
    const { metric, dateRange } = this.state
    this.props.getFormatChartRequest({ metric, dateRange })
  }

  iconClass(name) {
    switch (name) {
      case 0:
        return 'icon-icon_stopmotion'

      case 1:
        return 'icon-icon_animation'

      case 2:
        return 'icon-icon_liveaction'

      case 3:
        return 'icon-icon_cinemagraph'

      default:
        return null
    }
  }

  render() {
    const { metric, dateRange } = this.state
    const {
      formatChartData: { data, video, currentDay, loading },
    } = this.props

    const isDataEmpty =
      (!loading &&
        !!data &&
        !!data.length &&
        data.every((d) => d.count === 0)) ||
      isEmpty(data)

    const dateLabel = dateRangeLabels[dateRange]

    const formatLabel = !isDataEmpty && !!data[0] && data[0].name 
       
    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div
            className={style.marketViewCard}
            style={{
              backgroundColor: colors.modalBackground,
              color: colors.textColor,
              boxShadow: `0 2px 6px 0 ${colors.moduleShadow}`,
            }}
          >
            {(loading || (isDataEmpty && !loading)) && (
              <div
                className={style.marketViewCardEmpty}
                style={{ backgroundColor: colors.moduleBackgroundOpacity }}
              >
                {loading ? <RouterLoading /> : 'No Data Available'}
              </div>
            )}
            <div className={style.marketViewCardTitle}>Format</div>
            <div className={style.marketViewCardSubTitle}>
              Format breakdown by time
            </div>

            {true && ( //!!currentDay && (
              <div className={style.chartSectionBadge}>
                <span
                  style={{
                    background: colors.labelBackground,
                    color: colors.labelColor,
                    boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                  }}
                >
                  {dateLabel}
                </span>
              </div>
            )}
            {!loading && (
              <React.Fragment>
                <div
                  className={classnames(style.videoContainer, {
                    [colors.themeType === 'dark'
                      ? style.dark
                      : style.light]: true,
                  })}
                >
                  {video && (
                    <SingleVideoCard
                      video={video}
                      muted={false}
                      options={{ size: 'auto', barColor: 'transparent' }}
                    />
                  )}
                </div>

                <div className={style.marketViewCardChartTitle}>
                  {formatLabel}
                </div>
              </React.Fragment>
            )}
            <div className={formatStyles.formatItems}>
              {data &&
                !loading &&
                data.map((item, i) => (
                  <div key={i} className={formatStyles.formatItem}>
                    <div className={formatStyles.formatItemIcon}>
                      <span>{metricSuffix(item.count)}</span>
                    </div>
                    <div className={formatStyles.formatItemText}>
                      <span>{item.name}</span>
                      <span>Categories</span>
                    </div>
                  </div>
                ))}
            </div>

            <div className={style.marketViewCardDescription}>
              {`A summary of the top formats associated with the highest number of ${metric} for the ${dateLabel.toLowerCase()}.`}
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
