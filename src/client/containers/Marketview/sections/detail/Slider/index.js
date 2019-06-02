import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  selectMarketviewVideosView,
  selectMarketviewSelectedVideoView,
} from 'Reducers/marketview'
import SliderModule from 'Components/Modules/SliderModule'

class Slider extends React.Component {
  componentDidMount() {
    this.props.getCompetitorVideosRequest()
  }
  getCompetitorVideos = (data) => {
    this.props.getCompetitorVideosRequest(data)
  }
  changeSelectedVideo = (video) => {
    this.props.setSelectedVideo(video)
  }

  render() {
    const { videos, selectedVideo, title, moduleKey, filters } = this.props
    return (
      <SliderModule
        data={videos || []}
        selectedVideo={selectedVideo}
        changeSelectedVideo={this.changeSelectedVideo}
        action={this.getCompetitorVideos}
        moduleKey={moduleKey}
        title={title}
        filters={filters}
      />
    )
  }
}
Slider.propTypes = {}

const mapStateToProps = createStructuredSelector({
  videos: selectMarketviewVideosView(),
  selectedVideo: selectMarketviewSelectedVideoView(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Slider)
