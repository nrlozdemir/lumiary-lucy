/**
 *
 * Marketview Time
 *
 */

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketview } from 'Reducers/marketview'

import Slider from 'Containers/Marketview/sections/detail/Slider'
import DaySelection from 'Containers/Marketview/sections/detail/DaySelection'
import TopVideosCardModule from 'Components/Modules/TopVideosCardModule'
import TopSimilarPropertiesModule from 'Components/Modules/TopSimilarPropertiesModule'
import RouterLoading from 'Components/RouterLoading'

const topVideosReferences = [
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
]

/* eslint-disable react/prefer-stateless-function */
export class Time extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeDay: 'monday',
    }
  }

  componentDidMount() {
    this.props.getCompetitorTopVideosRequest()
    this.props.getCompetitorVideosRequest()
    this.props.getSimilarPropertiesRequest()
    this.props.getMarketviewDetailTimeRequest()
  }

  changeSelectedVideo = (video) => {
    this.props.setSelectedVideo(video)
  }

  changeActiveDay(day) {
    this.setState({ activeDay: day })
  }

  render() {
    const {
      marketview,
      marketview: { selectedVideo, marketviewDetailTime, competitorTopVideos },
    } = this.props
    const { activeDay } = this.state

    const selectedDayData =
      marketviewDetailTime && marketviewDetailTime[activeDay]
    if (!selectedVideo || marketview.loading || !marketviewDetailTime) {
      return <RouterLoading />
    }

    return (
      <React.Fragment>
				<DaySelection
          onDayChange={(day) => this.changeActiveDay(day)}
          activeDay={activeDay}
        />
				<Slider
					data={selectedDayData.CompetitorVideos || []}
					selectedVideo={selectedVideo}
					changeSelectedVideo={this.changeSelectedVideo}
					title={`Top Performing ${activeDay
						.charAt(0)
						.toUpperCase()}${activeDay.slice(1)} Videos`}
				/>
				<TopSimilarPropertiesModule
					moduleKey="MarketView/TopSimilarPropertiesModule"
					data={selectedDayData.SimilarProperties}
					title="Top Similar Properties Of Top Videos"
					action={this.getSimilarProperties}
					filters={[
						{
							type: 'timeRange',
							selectKey: 'timeRange',
							placeHolder: 'timeRange',
						},
					]}
				/>
				<TopVideosCardModule
					chartData={selectedDayData.CompetitorTopVideos}
					height={150}
					moduleKey="MarketView/TopVideosCardModule"
					title="Top Performing Property Across All Days Of The Week"
					action={this.getCompetitorVideos}
					filters={[
						{
							type: 'videoProperty',
							selectKey: 'videoProperty',
							placeHolder: 'videoProperty',
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
