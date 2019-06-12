import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  selectMarketviewCompetitorTopVideosView,
  selectMarketviewTopPerformingDataView,
} from 'Reducers/marketview'
import { makeSelectSelectFilters } from 'Reducers/selectFilters'

import TopVideosCard from 'Components/Modules/TopVideosCardModule'

class TopVideosOverTime extends React.Component {
  callback = (data) => {
    if (this.props.container === 'time') {
      this.props.getTopPerformingTimeRequest(data)
    } else {
      this.props.getCompetitorTopVideosRequest(data)
    }
  }

  render() {
    const {
      competitorTopVideos,
      topPerformingData,
      title,
      moduleKey,
      filters,
      references,
      container,
      selects,
    } = this.props

    const referencesData =
      container === 'time'
        ? topPerformingData &&
          topPerformingData.datasets &&
          topPerformingData.datasets.map((item) => ({
            text: item.label,
            color: item.backgroundColor,
          }))
        : references

    const chartData =
      container === 'time' ? topPerformingData.data : competitorTopVideos.data

    const selectValue =
      selects.values[moduleKey] &&
      selects.values[moduleKey]['Mwvlt-date'] &&
      selects.values[moduleKey]['Mwvlt-date'].value &&
      selects.values[moduleKey]['Mwvlt-date'].value.label

    return (
      <TopVideosCard
        chartData={chartData}
        height={150}
        moduleKey={moduleKey}
        title={
          title +
          (container === 'time' ? ' ' + (selectValue || 'Past Week') : '')
        }
        action={this.callback}
        filters={filters}
        references={referencesData}
      />
    )
  }
}
TopVideosOverTime.propTypes = {}

const mapStateToProps = createStructuredSelector({
  competitorTopVideos: selectMarketviewCompetitorTopVideosView(),
  topPerformingData: selectMarketviewTopPerformingDataView(),
  selects: makeSelectSelectFilters(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(TopVideosOverTime)
