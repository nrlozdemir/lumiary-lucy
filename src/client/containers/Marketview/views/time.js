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
import TopSimilarPropertiesModule from 'Components/Modules/TopSimilarPropertiesModule'

import { chartCombineDataset } from 'Utils'
import { CompetitorTopVideos_DatasetOptions } from 'Containers/Marketview/sections/detail/options'

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

  getSimilarProperties = (data) => {
    this.props.getSimilarPropertiesRequest(data)
  }

  getCompetitorTopVideos = (data) => {
    this.props.getCompetitorTopVideosRequest(data)
  }

  render() {
    const {
      marketview,
      marketview: { selectedVideo, marketviewDetailTime, competitorTopVideos },
    } = this.props
    const { activeDay } = this.state

    const selectedDayData =
      marketviewDetailTime && marketviewDetailTime[activeDay]

    if (!selectedDayData) return false

    const competitorTopVideosCombineData = chartCombineDataset(
      {
        labels: ['360', '480', '720p', '1080p', '4k'],
        datasets: selectedDayData.CompetitorTopVideos,
      },
      CompetitorTopVideos_DatasetOptions
    )

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
        />
        <TopSimilarPropertiesModule
          moduleKey="MarketView/TopSimilarPropertiesModule"
          data={(selectedDayData && selectedDayData.SimilarProperties) || null}
          title="Top Similar Properties Of Top Videos"
          action={this.getSimilarProperties}
          presentWithDoughnut
          filters={[
            {
              type: 'dateRange',
              selectKey: 'dateRange',
              placeHolder: 'dateRange',
            },
          ]}
        />
        <TopVideosCardModule
          chartData={competitorTopVideosCombineData}
          height={150}
          moduleKey="MarketView/TopVideosCardModule"
          title="Top Performing Property Across All Days Of The Week"
          action={this.getCompetitorTopVideos}
          filters={[
            {
              type: 'property',
              selectKey: 'property',
              placeHolder: 'property',
            },
          ]}
          references={[
            {
              className: 'bg-cool-blue',
              text: 'Fast',
            },
            {
              className: 'bg-lighter-purple',
              text: 'Medium',
            },
            {
              className: 'bg-coral-pink',
              text: 'Slow',
            },
            {
              className: 'bg-cool-grey',
              text: 'Slowest',
            },
          ]}
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

export default compose(withConnect)(Time)
