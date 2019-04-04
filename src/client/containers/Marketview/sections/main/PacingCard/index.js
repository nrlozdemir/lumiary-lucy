import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketviewPacingChart } from 'Reducers/marketview'

import style from 'Containers/Marketview/style.scss'
import PacingPieChart from 'Components/Charts/MarketView/PacingPieChart'
import classnames from 'classnames'

class PacingCard extends Component {
  componentDidMount() {
    this.props.getPacingChartRequest()
  }

  render() {
    const { pacingChartData } = this.props
    return (
      <div className={style.marketViewCard}>
        <div className={style.marketViewCardTitle}>Pacing</div>
        <div className={style.marketViewCardSubTitle}>
          Top Competitor Similarities
        </div>
        <div className={style.marketViewCardDate}>
          <span>Past Month</span>
        </div>
        <PacingPieChart data={pacingChartData} />
        <div className={style.marketViewCardChartTitle}>Medium Paced</div>
        <div
          className={classnames(
            style.colorListSmall,
            style.colorListHorizontal,
            style.colorList
          )}
        >
          <div className={style.colorListItem}>Slowest</div>
          <div className={style.colorListItem}>Slow</div>
          <div className={style.colorListItem}>Medium</div>
          <div className={style.colorListItem}>Fast</div>
        </div>

        <div className={style.marketViewCardDescription}>
          Based on the number of shares for competitors across all platforms
        </div>
        <Link to="/marketview/platform" className={style.marketViewCardLink}>
          View Competitor Metrics
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
  pacingChartData: makeSelectMarketviewPacingChart(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(PacingCard)
