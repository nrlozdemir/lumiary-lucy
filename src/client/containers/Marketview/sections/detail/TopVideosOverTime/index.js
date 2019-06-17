import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  selectMarketviewCompetitorTopVideosView,
  selectMarketviewPlatformTopVideosView,
  selectMarketviewTopPerformingDataView,
} from 'Reducers/marketview'
import { makeSelectSelectFilters } from 'Reducers/selectFilters'

import TopVideosCard from 'Components/Modules/TopVideosCardModule'

class TopVideosOverTime extends React.Component {
  callback = (data) => {
    if (this.props.container === 'time') {
      this.props.getTopPerformingTimeRequest(data)
    } else if (this.props.container === 'platform') {
      this.props.getPlatformTopVideosRequest(data)
    } else {
      this.props.getCompetitorTopVideosRequest(data)
    }
  }

  render() {
    const {
      competitorTopVideos,
      platformTopVideos,
      topPerformingData,
      title,
      moduleKey,
      filters,
      references,
      container,
      selects,
    } = this.props

    const whichReferencesData =
      container === 'time'
        ? 'topPerformingData'
        : container === 'competitor'
        ? 'competitorTopVideos'
        : null
    const referencesData =
      container === 'time' || container === 'competitor'
        ? this.props[whichReferencesData].data &&
          this.props[whichReferencesData].data.datasets &&
          this.props[whichReferencesData].data.datasets.map((item) => ({
            text: item.label,
            color: item.backgroundColor,
          }))
        : references

    const chartData =
      container === 'time'
        ? topPerformingData.data
        : container === 'platform'
        ? platformTopVideos.data
        : competitorTopVideos.data

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
  platformTopVideos: selectMarketviewPlatformTopVideosView(),
  selects: makeSelectSelectFilters(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(TopVideosOverTime)
