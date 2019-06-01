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
    const { videos, selectedVideo } = this.props
    console.log('slide', this.props.videos)
    return (
      <SliderModule
        data={videos || []}
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
