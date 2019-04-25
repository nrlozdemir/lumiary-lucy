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
import TopVideosCard from 'Containers/Marketview/sections/detail/TopVideosCard'
import TopSimilarProperties from 'Containers/Marketview/sections/detail/TopSimilarProperties'
import BarChartModule from 'Components/Modules/BarChartModule'
import RouterLoading from 'Components/RouterLoading'

import style from '../style.scss'
import { randomKey } from '../../../utils'

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
    this.props.getCompetitorVideosRequest()
    this.props.getSimilarPropertiesRequest()
    this.props.getTopPerformingPropertiesByCompetitorsRequest()
  }

  getTopPerformingPropertiesByCompetitors = (data) => {
    this.props.getTopPerformingPropertiesByCompetitorsRequest(data)
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
    console.log(selectedVideo)
    if (!selectedVideo || marketview.loading) {
      return <RouterLoading />
    }

    return (
      <React.Fragment>
        <Slider
          data={marketview.videos}
          selectedVideo={selectedVideo}
          changeSelectedVideo={this.changeSelectedVideo}
          title="Top Performing Competitor Videos"
        />
        {competitorTopVideos && (
          <TopVideosCard chartData={competitorTopVideos} height={150} />
        )}
        {similarProperties && <TopSimilarProperties data={similarProperties} />}
        <div className="grid-collapse">
          <BarChartModule
            moduleKey={randomKey(10)}
            containerClass={style.detailTopPerformingPropertyContainer}
            barData={topPerformingPropertiesByCompetitorsData}
            tickOptions={chartTickOptions}
            title="Top Performing Property Across All Competitors"
            height={50}
            action={(e) => this.getTopPerformingPropertiesByCompetitors(e)}
            filters={[
              {
                type: 'engagement',
                selectKey: randomKey(10),
                placeHolder: 'Engagement',
              },
            ]}
            footerLabels={['Fast', 'Medium', 'Slow', 'Slowest']}
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
