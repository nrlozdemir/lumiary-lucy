import React, { Component } from 'react'
import classnames from 'classnames'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectMarketviewCompetitorView,
} from 'Reducers/marketview'

import BarChart from 'Components/Charts/BarChart'
import style from 'Containers/Marketview/style.scss'
import Module from 'Components/Module'

class TotalCompetitorViewsCard extends Component {
  componentDidMount() {
    this.props.getTotalCompetitorViewsRequest()
  }

  render() {
    // console.log('Competitor', this.props.totalCompetitorViewsData)
    const {
      containerClass = '',
      totalCompetitorViewsData,
      totalCompetitorViewsValues,
      tickOptions,
      title = 'Total Competitor Views By Duration',
      titleLabels,
      footerLabels,
      width,
      height,
      filters,
      selects,
    } = this.props
    const chartContainer = classnames(
      'shadow-1 col-12 mb-48',
      style.chartContainer,
      containerClass
    )

    return (
      <Module
        moduleKey={'Panoptic/ColorTemperature'}
        title={title}
        filters={filters}
        legend={
          titleLabels && (
            <div
              className={classnames(
                style.colorListHorizontal,
                style.colorList,
                style.floatRight
              )}
            >
              {titleLabels.map((title, index) => (
                <div key={index} className={style.colorListItem}>
                  {title}
                </div>
              ))}
            </div>
          )
        }
      >
        {totalCompetitorViewsData && (
          <BarChart
            barDurationData={totalCompetitorViewsData}
            tickOptions={tickOptions}
            width={width}
            height={height}
          />
        )}
        {footerLabels && (
          <div
            className={classnames(style.colorListHorizontal, style.colorList)}
          >
            {footerLabels.map((title, index) => (
              <div key={index} className={style.colorListItem}>
                {title}
              </div>
            ))}
          </div>
        )}
      </Module>
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
