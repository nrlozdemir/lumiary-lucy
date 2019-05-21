/**
 *
 * Marketview Platform
 *
 */
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketview } from 'Reducers/marketview'

import Slider from 'Components/Modules/SliderModule'
import TopVideosCardModule from 'Components/Modules/TopVideosCardModule'
import TopSimilarPropertiesModule from 'Components/Modules/TopSimilarPropertiesModule'
import RouterLoading from 'Components/RouterLoading'
import BarChartModule from 'Components/Modules/BarChartModule'

import { chartCombineDataset } from 'Utils'
import { TopPerformingProperties_DatasetOptions } from 'Containers/Marketview/sections/detail/options'

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
export class Platform extends React.Component {
  changeSelectedVideo = (video) => {
    this.props.setSelectedVideo(video)
  }

  getSimilarProperties = (data) => {
    this.props.getSimilarPropertiesRequest(data)
  }

  getCompetitorVideos = (data) => {
    this.props.getCompetitorVideosRequest(data)
  }

  getCompetitorTopVideos = (data) => {
    this.props.getCompetitorTopVideosRequest(data)
  }

  getTopPerformingProperties = (data) => {
    this.props.getTopPerformingPropertiesRequest(data)
  }

  render() {
    const {
      marketview,
      marketview: {
        selectedVideo,
        competitorTopVideos,
        similarProperties,
        topPerformingPropertiesData,
      },
    } = this.props

    const topPerformingPropertiesDataCombineData = chartCombineDataset(
      {
        labels: ['Facebook', 'Instagram', 'Twitter', 'Youtube'],
        datasets: topPerformingPropertiesData,
      },
      TopPerformingProperties_DatasetOptions
    )

    return (
      <React.Fragment>
        <Slider
          data={marketview.videos || []}
          selectedVideo={selectedVideo}
          changeSelectedVideo={this.changeSelectedVideo}
          title="Top Performing Videos By Platform"
          moduleKey="MarketView/Platform/Slider"
          action={this.getCompetitorVideos}
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
          moduleKey="MarketView/Platform/TopVideosCardModule"
          chartData={competitorTopVideos}
          height={150}
          title="Top Videos Over Time By Platform"
          action={this.getCompetitorTopVideos}
          filters={[
            {
              type: 'property',
              selectKey: 'mwplttvcm-property',
              placeHolder: 'property',
            },
            {
              type: 'metric',
              selectKey: 'mwplttvcm-engagement',
              placeHolder: 'engagement',
            },
            {
              type: 'dateRange',
              selectKey: 'mwplttvcm-dateRange',
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
          title="Top Similar Properties Of Top Videos"
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
          moduleKey="MarketView/Platform/TopPerformingPropertyAcrossAllPlatforms"
          barData={topPerformingPropertiesDataCombineData}
          title="Top Performing Property Across All Platforms"
          height={55}
          tickOptions={chartTickOptions}
          action={this.getTopPerformingProperties}
          filters={[
            {
              type: 'metric',
              selectKey: 'mwplttpaap-engagement',
              placeHolder: 'Engagement',
            },
            {
              type: 'pacing',
              selectKey: 'mwplttpaap-pacing',
              placeHolder: 'Pacing',
            },
          ]}
        />
      </React.Fragment>
    )
  }
}

Platform.propTypes = {}

const mapStateToProps = createStructuredSelector({
  marketview: makeSelectMarketview(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Platform)
