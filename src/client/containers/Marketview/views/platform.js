/**
 *
 * Marketview Platform
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
import TotalCompetitorViewsCard from 'Containers/Marketview/sections/main/TotalCompetitorViewsCard'
import RouterLoading from 'Components/RouterLoading'

import style from '../style.scss'

const topVideosReferences = [
  {
    className: 'bg-cool-blue',
    text: 'Facebook',
  },
  {
    className: 'bg-lighter-purple',
    text: 'Instagram',
  },
  {
    className: 'bg-coral-pink',
    text: 'Twitter',
  },
  {
    className: 'bg-cool-grey',
    text: 'Youtube',
  },
  {
    className: 'bg-dusk"',
    text: 'Pinterest',
  },
]

const chartTickOptions = {
  stepSize: 250000,
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
  componentDidMount() {
    this.props.getCompetitorTopVideosRequest()
    this.props.getCompetitorVideosRequest()
    this.props.getSimilarPropertiesRequest()
    this.props.getTopPerformingPropertiesRequest()
  }

  changeSelectedVideo = (video) => {
    this.props.setSelectedVideo(video)
  }

  render() {
    const {
      marketview,
      marketview: {
        competitorTopVideos,
        similarProperties,
        topPerformingPropertiesData,
      },
    } = this.props

    if (!marketview.selectedVideo || marketview.loading) {
      return <RouterLoading />
    }

    return (
      <React.Fragment>
        <Slider
          data={marketview}
          changeSelectedVideo={this.changeSelectedVideo}
        />
        {competitorTopVideos && (
          <TopVideosCard
            chartData={competitorTopVideos}
            title="Top Videos Over Time By Platform"
            references={topVideosReferences}
          />
        )}
        {similarProperties && <TopSimilarProperties data={similarProperties} />}
        {topPerformingPropertiesData && (
          <div className="grid-collapse">
            <TotalCompetitorViewsCard
              containerClass={style.detailTopPerformingPropertyContainer}
              totalCompetitorViewsData={topPerformingPropertiesData}
              tickOptions={chartTickOptions}
              title="Top Performing Property Across All Platforms"
              height={100}
              selects={['Resolution', 'Likes']}
              footerLabels={['Fast', 'Medium', 'Slow', 'Slowest']}
            />
          </div>
        )}
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
