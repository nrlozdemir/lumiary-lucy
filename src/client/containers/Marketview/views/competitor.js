/**
 *
 * Marketview Competitor
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketview } from 'Reducers/marketview'

import Slider from 'Components/Modules/SliderModule'
import TopSimilarPropertiesModule from 'Components/Modules/TopSimilarPropertiesModule'
import BarChartModule from 'Components/Modules/BarChartModule'
import TopVideosCardModule from 'Components/Modules/TopVideosCardModule'

import { chartCombineDataset } from 'Utils'
import {
  CompetitorTopVideos_DatasetOptions,
  TopPerformingProperties_DatasetOptions,
} from 'Containers/Marketview/sections/detail/options'

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
  getSimilarProperties = (data) => {
    this.props.getSimilarPropertiesRequest(data)
  }

  getTopPerformingPropertiesByCompetitors = (data) => {
    this.props.getTopPerformingPropertiesByCompetitorsRequest(data)
  }

  getCompetitorVideos = (data) => {
    this.props.getCompetitorVideosRequest(data)
  }

  getCompetitorTopVideos = (data) => {
    this.props.getCompetitorTopVideosRequest(data)
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

    const competitorTopVideosCombineData = chartCombineDataset(
      competitorTopVideos,
      CompetitorTopVideos_DatasetOptions
    )

    const topPerformingPropertiesDataCombineData = chartCombineDataset(
      {
        labels: [
          'Barstool Sports',
          'SB Nation',
          'ESPN',
          'Scout Media',
          'Fansided',
        ],
        datasets: topPerformingPropertiesByCompetitorsData,
      },
      TopPerformingProperties_DatasetOptions
    )

    console.log(topPerformingPropertiesByCompetitorsData)

    return (
      <React.Fragment>
        <div className="grid-collapse">
          <Slider
            data={marketview.videos || []}
            selectedVideo={selectedVideo}
            changeSelectedVideo={this.changeSelectedVideo}
            action={this.getCompetitorVideos}
            title="Top Performing Competitor Videos"
            filters={[
              {
                type: 'metric',
                selectKey: 'Mwplt-engagement',
                placeHolder: 'Engagement',
              },
              {
                type: 'dateRange',
                selectKey: 'Mwplt-date',
                placeHolder: 'Date',
              },
            ]}
          />
          <TopVideosCardModule
            chartData={competitorTopVideosCombineData}
            height={150}
            moduleKey="MarketView/TopVideosCardModule"
            title="Top Videos Over Time By Competitor"
            action={this.getCompetitorTopVideos}
            filters={[
              {
                type: 'property',
                selectKey: 'property',
                placeHolder: 'property',
              },
              {
                type: 'metric',
                selectKey: 'engagement',
                placeHolder: 'engagement',
              },
              {
                type: 'dateRange',
                selectKey: 'dateRange',
                placeHolder: 'dateRange',
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
                type: 'dateRange',
                selectKey: 'dateRange',
                placeHolder: 'dateRange',
              },
            ]}
          />
          <BarChartModule
            moduleKey="MarketView/topPerformingPropertiesByCompetitors"
            containerClass={style.detailTopPerformingPropertyContainer}
            barData={topPerformingPropertiesDataCombineData}
            tickOptions={chartTickOptions}
            title="Top Performing Property Across All Competitors"
            height={50}
            action={this.getTopPerformingPropertiesByCompetitors}
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
