import React, { Component } from 'react'
import classnames from 'classnames'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectMarketviewCompetitorView,
} from 'Reducers/marketview'

import SelectFilters from 'Components/SelectFilters'
import TotalCompetitorViewsChart from 'Components/Charts/MarketView/TotalCompetitorViewsChart'
import style from 'Containers/Marketview/style.scss'
import componentStyle from './style.scss'

const selectClasses = classnames('custom-select', style.selectStyles)

class TotalCompetitorViewsCard extends Component {


  componentDidMount() {
    this.props.getTotalCompetitorViewsRequest()
  }

  render() {
    // console.log('Competitor', this.props.totalCompetitorViewsData)
    const {
      containerClass = '',
      totalCompetitorViewsData,
      tickOptions,
      title = 'Total Competitor Views By Duration',
      titleLabels,
      footerLabels,
      width,
      height,
      selects,
    } = this.props
    const chartContainer = classnames(
      'shadow-1 col-12 mb-48',
      style.chartContainer,
      containerClass
    )

    return (
      <div className={chartContainer}>
        <div className={style.cardTitle}>
          <span>{title}</span>
          {titleLabels && (
            <div
              className={classnames(style.colorListHorizontal, style.colorList)}
            >
              {titleLabels.map((title, index) => (
                <div key={index} className={style.colorListItem}>
                  {title}
                </div>
              ))}
            </div>
          )}

        </div>
        {totalCompetitorViewsData && (
          <div className="col-12 d-flex">
            <TotalCompetitorViewsChart
              barDurationData={totalCompetitorViewsData}
              tickOptions={tickOptions}
              width={width}
              height={height}
            />
          </div>
        )}
        {footerLabels && (
          <div className="col-12 d-flex justify-content-center mt-48 align-items-center">
            <div
              className={classnames(style.colorListHorizontal, style.colorList)}
            >
              {footerLabels.map((title, index) => (
                <div key={index} className={style.colorListItem}>
                  {title}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  totalCompetitorViewsData: makeSelectMarketviewCompetitorView(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(TotalCompetitorViewsCard)
