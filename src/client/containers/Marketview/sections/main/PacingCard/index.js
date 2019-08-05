import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketviewPacingChart } from 'Reducers/marketview'
import { ThemeContext } from 'ThemeContext/themeContext'
import RightArrowCircle from 'Components/Icons/RightArrowCircle'

import style from 'Containers/Marketview/style.scss'
import PacingPieChart from 'Components/Charts/MarketView/PacingPieChart'
import classnames from 'classnames'

import { dateRangeLabels } from 'Utils/globals'
import { isDataSetEmpty } from 'Utils/datasets'
import { pacingCard_DatasetOptions } from './options'
import { isEmpty } from 'lodash'
import RouterLoading from 'Components/RouterLoading'

class PacingCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateRange: '3months',
      metric: 'views',
    }
  }

  componentDidMount() {
    const { metric, dateRange } = this.state
    this.props.getPacingChartRequest({
      metric,
      dateRange,
    })
  }

  render() {
    const { metric, dateRange } = this.state
    const {
      pacingChartData: { data, loading, error },
    } = this.props

    const isDataEmpty = (!loading && isDataSetEmpty(data)) || isEmpty(data)
    const { datasets = [], labels = [] } = data || {}
    let maxPacing

    if (datasets[0]) {
      const { data: dataSet = [] } = datasets[0]
      const maxIndex = dataSet.indexOf(Math.max(...dataSet))
      if (labels[maxIndex]) {
        maxPacing = labels[maxIndex]
      }
    }

    const dateLabel = dateRangeLabels[dateRange]

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
            <div className={style.marketViewCardTitle}>Pacing</div>
            <div className={style.marketViewCardSubTitle}>
              Top Competitor Similarities
            </div>
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

            {!isDataEmpty && !loading && (
              <PacingPieChart data={data} colors={colors} />
            )}
            {!loading && (
              <div className={style.marketViewCardChartTitle}>
                {!maxPacing ? `` : `${maxPacing} Paced`}
              </div>
            )}
            <div
              className={classnames(
                style.colorListSmall,
                style.colorListHorizontal,
                style.colorList
              )}
            >
              {!loading &&
                !!data &&
                !!data.labels &&
                data.labels.map((label, idx) => (
                  <div
                    key={`MV/PacingCard_label-${idx}`}
                    className={style.colorListItem}
                  >
                    {label}
                  </div>
                ))}
            </div>

            <div className={style.marketViewCardDescription}>
              {`The top performing video pacing associated with the highest number of ${metric} for videos outside of your library in the ${dateLabel.toLowerCase()}.`}
            </div>
            <Link
              to="/marketview/competitor"
              className={style.marketViewCardLink}
              style={{
                backgroundColor: colors.moduleBorder,
                color: colors.textColor,
              }}
            >
              View Competitor Metrics
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
  pacingChartData: makeSelectMarketviewPacingChart(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(PacingCard)
