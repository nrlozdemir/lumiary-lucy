/**
 *
 * Marketview Competitor
 *
 */

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketview } from 'Reducers/marketview'

import Slider from 'Containers/Marketview/sections/detail/Slider'
import TopSimilarPropertiesModule from 'Components/Modules/TopSimilarPropertiesModule'
import BarChartModule from 'Components/Modules/BarChartModule'
import TopVideosCardModule from 'Components/Modules/TopVideosCardModule'

import RouterLoading from 'Components/RouterLoading'

import style from '../style.scss'

const chartTickOptions = {
  stepSize: 250000,
  min: 0,
  max: 1000000,
  callback(value) {
    if (value < 1000) {
      return value
    } else if (value < 1000000) {
      return `${Math.round(value / 1000)}k`
    }
    return `${Math.round((value * 100) / 1000000) / 100}m`
  },
}

/* eslint-disable react/prefer-stateless-function */
export class Competitor extends React.Component {
  componentDidMount() {
    this.props.getCompetitorTopVideosRequest()
  }

  getSimilarProperties = (data) => {
    this.props.getSimilarPropertiesRequest(data)
  }

  getTopPerformingPropertiesByCompetitors = (data) => {
    this.props.getTopPerformingPropertiesByCompetitorsRequest(data)
  }

  getCompetitorVideos = (data) => {
    this.props.getCompetitorVideosRequest(data)
  }

  changeSelectedVideo = (video) => {
    this.props.setSelectedVideo(video)
  }

  render() {
    const {
      marketview,
      marketview: {
        selectedVideo,
        competitorTopVideos,
        similarProperties,
        topPerformingPropertiesByCompetitorsData,
      },
    } = this.props
    return (
      <React.Fragment>
        <div className="grid-collapse">
          {/* <Slider
            data={marketview.videos}
            selectedVideo={selectedVideo}
            changeSelectedVideo={this.changeSelectedVideo}
            title="Top Performing Competitor Videos"
          /> */}
          <TopVideosCardModule
            chartData={competitorTopVideos}
            height={150}
            moduleKey="MarketView/TopVideosCardModule"
            title="Top Videos Over Time By Competitor"
            action={this.getCompetitorVideos}
            filters={[
              {
                type: 'videoProperty',
                selectKey: 'videoProperty',
                placeHolder: 'videoProperty',
              },
              {
                type: 'engagement',
                selectKey: 'engagement',
                placeHolder: 'engagement',
              },
              {
                type: 'timeRange',
                selectKey: 'timeRange',
                placeHolder: 'timeRange',
              },
            ]}
            references={[
              {
                className: 'bg-cool-blue',
                text: 'Barstool Sports',
              },
              {
                className: 'bg-lighter-purple',
                text: 'SB Nation',
              },
              {
                className: 'bg-coral-pink',
                text: 'ESPN',
              },
              {
                className: 'bg-cool-grey',
                text: 'Scout Media',
              },
              {
                className: 'bg-dusk"',
                text: 'Fansided',
              },
            ]}
          />
          <TopSimilarPropertiesModule
            moduleKey="MarketView/TopSimilarPropertiesModule"
            data={similarProperties}
            title="Top Performing Property Across All Competitors"
            action={this.getSimilarProperties}
            filters={[
              {
                type: 'timeRange',
                selectKey: 'timeRange',
                placeHolder: 'timeRange',
              },
            ]}
          />
          <BarChartModule
            moduleKey="MarketView/topPerformingPropertiesByCompetitors"
            containerClass={style.detailTopPerformingPropertyContainer}
            barData={topPerformingPropertiesByCompetitorsData}
            tickOptions={chartTickOptions}
            title="Top Performing Property Across All Competitors"
            height={50}
            action={this.getTopPerformingPropertiesByCompetitors}
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
        </div>
      </React.Fragment>
    )
  }
}

Competitor.propTypes = {}

const mapStateToProps = createStructuredSelector({
  marketview: makeSelectMarketview(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Competitor)
