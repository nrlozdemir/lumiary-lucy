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

import { isEqual } from 'lodash'

class TopVideosOverTime extends React.Component {
  shouldComponentUpdate(prevProps) {
    const {
      container,
      topPerformingData,
      competitorTopVideos,
      platformTopVideos,
    } = this.props

    if (container === 'time') {
      return !isEqual(prevProps.topPerformingData, topPerformingData)
    } else if (container === 'platform') {
      return !isEqual(prevProps.platformTopVideos, platformTopVideos)
    } else {
      return !isEqual(prevProps.competitorTopVideos, competitorTopVideos)
    }
  }

  callback = (data) => {
    const {
      container,
      getTopPerformingTimeRequest,
      getPlatformTopVideosRequest,
      getCompetitorTopVideosRequest,
    } = this.props

    if (container === 'time') {
      getTopPerformingTimeRequest(data)
    } else if (container === 'platform') {
      getPlatformTopVideosRequest(data)
    } else {
      getCompetitorTopVideosRequest(data)
    }
  }

  render() {
    const {
      title,
      moduleKey,
      filters,
      references,
      container,
      selects,
      topPerformingData: {
        data: topPerformingData,
        loading: topPerformingLoading,
      },
      competitorTopVideos: {
        data: competitorTopData,
        loading: competitorTopLoading,
      },
      platformTopVideos: { data: platformTopData, loading: platformTopLoading },
      infoText,
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
        ? topPerformingData
        : container === 'platform'
        ? platformTopData
        : competitorTopData

    const selectValue =
      selects.values[moduleKey] &&
      selects.values[moduleKey]['Mwvlt-date'] &&
      selects.values[moduleKey]['Mwvlt-date'].value &&
      selects.values[moduleKey]['Mwvlt-date'].value.label

    const loading =
      topPerformingLoading || competitorTopLoading || platformTopLoading

    return (
      <TopVideosCard
        infoText={infoText}
        chartData={loading ? {} : chartData}
        height={150}
        moduleKey={moduleKey}
        title={
          title +
          (container === 'time' ? ' ' + (selectValue || 'Past Week') : '')
        }
        action={this.callback}
        filters={filters}
        references={loading ? [] : referencesData}
        loading={loading}
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
