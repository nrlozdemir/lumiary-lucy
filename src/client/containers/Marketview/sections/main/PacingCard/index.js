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

import { isDataSetEmpty } from 'Utils/datasets'
import { pacingCard_DatasetOptions } from './options'
import { isEmpty } from 'lodash'
import RouterLoading from 'Components/RouterLoading'

class PacingCard extends Component {
  componentDidMount() {
    this.props.getPacingChartRequest()
  }

  render() {
    const {
      pacingChartData: { data: dataToUpdate, loading, error },
    } = this.props

    const isDataEmpty =
      (!loading && isDataSetEmpty(dataToUpdate)) || isEmpty(dataToUpdate)

    const data =
      !isDataEmpty && !loading
        ? {
            ...dataToUpdate,
            datasets: [
              {
                ...dataToUpdate.datasets[0],
                data: dataToUpdate.datasets[0].data.map((v) =>
                  !!v ? (!!v.value ? v.value : 0) : 0
                ),
              },
            ],
          }
        : {}

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
                Past Month
              </span>
            </div>

            {!isDataEmpty && <PacingPieChart data={data} colors={colors} />}
            {!loading && (
              <div className={style.marketViewCardChartTitle}>Medium Paced</div>
            )}
            <div
              className={classnames(
                style.colorListSmall,
                style.colorListHorizontal,
                style.colorList
              )}
            >
              {!!data &&
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
              Based on the number of shares for competitors across all platforms
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
