/**
 *
 * Marketview Time
 *
 */

import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketview } from 'Reducers/marketview'

import Slider from 'Components/Modules/SliderModule'
import DaySelection from 'Containers/Marketview/sections/detail/DaySelection'
import TopVideosCardModule from 'Components/Modules/TopVideosCardModule'
import TopSimilarProperties from '../sections/detail/TopSimilarProperties'

import { withTheme } from 'ThemeContext/withTheme'

/* eslint-disable react/prefer-stateless-function */
export class Time extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeDay: 'monday',
    }
  }

  componentDidMount() {
    this.props.getMarketviewDetailTimeRequest()
  }

  changeSelectedVideo = (video) => {
    this.props.setSelectedVideo(video)
  }

  changeActiveDay(day) {
    this.setState({ activeDay: day })
  }

  getTimeTopVideos = (data) => {
    this.props.getTopPerformingTimeRequest(data)
  }

  render() {
    const { activeDay } = this.state

    const selectedDayData = data && data[activeDay]

    if (!selectedDayData) return false
    return (
      <React.Fragment>
        <DaySelection
          onDayChange={(day) => this.changeActiveDay(day)}
          activeDay={activeDay}
        />
        <Slider
          data={(selectedDayData && selectedDayData.CompetitorVideos) || []}
          selectedVideo={selectedVideo}
          changeSelectedVideo={this.changeSelectedVideo}
          title={`Top Performing ${activeDay
            .charAt(0)
            .toUpperCase()}${activeDay.slice(1)} Videos`}
          filters={[
            {
              type: 'metric',
              selectKey: 'Mwplt-metric',
              placeHolder: 'metric',
            },
            {
              type: 'dateRange',
              selectKey: 'Mwplt-date',
              placeHolder: 'Date',
            },
          ]}
          container="time"
        />
        <TopSimilarProperties
          moduleKey="MarketView/TopSimilarPropertiesModule"
          title="Similar Properties Of Top Videos"
          filters={[
            {
              type: 'dateRange',
              selectKey: 'dateRange',
              placeHolder: 'dateRange',
            },
          ]}
          container="time"
        />
        <TopVideosOverTime
          chartData={topPerformingData}
          height={150}
          moduleKey="MarketView/TopVideosCardModule"
          title="Top Performing Property Across All Days Of The Week"
          action={this.getTimeTopVideos}
          filters={[
            {
              type: 'property',
              selectKey: 'property',
              placeHolder: 'property',
            },
          ]}
          references={
            topPerformingData &&
            topPerformingData.datasets &&
            topPerformingData.datasets.map((item) => ({
              text: item.label,
              color: item.backgroundColor,
            }))
          }
          container="time"
        />
      </React.Fragment>
    )
  }
}

Time.propTypes = {}

const mapStateToProps = createStructuredSelector({
  marketview: makeSelectMarketview(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withConnect,
  withTheme
)(Time)
