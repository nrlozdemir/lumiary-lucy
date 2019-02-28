/**
 *
 * Marketview Detail
 *
 */

import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { compose, bindActionCreators } from "redux"
import { actions, makeSelectMarketview } from "Reducers/marketview"

import Slider from 'Containers/Marketview/sections/detail/Slider'
import TopVideosCard from "Containers/Marketview/sections/detail/TopVideosCard"
import TopSimilarProperties from "Containers/Marketview/sections/detail/TopSimilarProperties"
import RouterLoading from "Components/RouterLoading"

/* eslint-disable react/prefer-stateless-function */
export class Detail extends React.Component {
  componentDidMount() {
    this.props.getCompetitorTopVideosRequest()
    this.props.getCompetitorVideosRequest()
    this.props.getSimilarPropertiesRequest()
  }

  changeSelectedVideo = (video) => {
    this.props.setSelectedVideo(video)
  }

  render() {
    const {
      marketview,
      marketview: { competitorTopVideos, similarProperties }
    } = this.props

    if (!marketview.selectedVideo || marketview.loading) {
      return <RouterLoading/>
    }

    return (
      <React.Fragment>
        <Slider data={marketview} changeSelectedVideo={this.changeSelectedVideo}/>
        {competitorTopVideos && (
          <TopVideosCard chartData={competitorTopVideos} />
        )}
        {similarProperties && <TopSimilarProperties data={similarProperties} />}
      </React.Fragment>
    )
  }
}

Detail.propTypes = {}

const mapStateToProps = createStructuredSelector({
  marketview: makeSelectMarketview()
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Detail)
