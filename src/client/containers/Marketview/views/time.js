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
import TopVideosCard from 'Containers/Marketview/sections/detail/TopVideosCard'
import TopSimilarProperties from 'Containers/Marketview/sections/detail/TopSimilarProperties'
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
      marketview: { competitorTopVideos, similarProperties },
    } = this.props

    const { activeDay } = this.state

    if (!marketview.selectedVideo || marketview.loading) {
      return <RouterLoading />
    }

    return (
      <React.Fragment>
        <DaySelection
          onDayChange={(day) => this.changeActiveDay(day)}
          activeDay={activeDay}
        />
        <Slider
          data={marketview}
          changeSelectedVideo={this.changeSelectedVideo}
          className="mt-48"
          title={`Top Performing ${activeDay
            .charAt(0)
            .toUpperCase()}${activeDay.slice(1)} Videos`}
        />
        {similarProperties && <TopSimilarProperties data={similarProperties} />}
        {competitorTopVideos && (
          <TopVideosCard
            chartData={competitorTopVideos}
            title="Top Performing Property Across All Days Of The Week"
            selects={['Resolution']}
            references={topVideosReferences}
          />
        )}
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