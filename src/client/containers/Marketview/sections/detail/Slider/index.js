import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectMarketviewLoading,
  selectMarketviewVideosView,
  selectMarketviewSelectedVideoView,
} from 'Reducers/marketview'
import { makeSelectAuthProfile } from 'Reducers/auth'
import SliderModule from 'Components/Modules/SliderModule'
import style from './style.scss'

class Slider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRequestBody: {},
    }
  }

  getCompetitorVideos = (data = {}) => {
    const { container, activeDay, profile } = this.props
    const { brand = {} } = profile
    const { uuid: brandUuid, competitors = [] } = brand

    if (!brandUuid) {
      console.warn('brand uuid is not defined')
      return false
    }

    if (competitors.length === 0) {
      console.warn('no competitors provide')
    }

    const requestBody = {
      ...data,
      brandUuid,
    }

    if (activeDay) {
      requestBody.activeDay = activeDay
    }

    if (container === 'competitor') {
      requestBody.competitors = competitors
    }

    this.setState({
      lastRequestBody: requestBody,
    })

    this.props.getCompetitorVideosRequest(requestBody)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeDay !== this.props.activeDay) {
      this.getCompetitorVideos({
        ...this.state.lastRequestBody,
      })
    }
  }

  changeSelectedVideo = (video) => {
    this.props.setSelectedVideo(video)
  }

  render() {
    const {
      videos,
      selectedVideo,
      title,
      moduleKey,
      filters,
      loading,
      infoText,
    } = this.props

    return (
      <div className={style.sliderWrapper}>
        <SliderModule
          data={videos || []}
          selectedVideo={selectedVideo}
          changeSelectedVideo={this.changeSelectedVideo}
          action={this.getCompetitorVideos}
          moduleKey={moduleKey}
          title={title}
          filters={filters}
          loading={loading}
          infoText={infoText}
        />
      </div>
    )
  }
}
Slider.propTypes = {}

const mapStateToProps = createStructuredSelector({
  profile: makeSelectAuthProfile(),
  videos: selectMarketviewVideosView(),
  selectedVideo: selectMarketviewSelectedVideoView(),
  loading: makeSelectMarketviewLoading(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Slider)
