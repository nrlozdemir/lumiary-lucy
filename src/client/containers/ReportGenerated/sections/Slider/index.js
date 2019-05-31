import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectReportsTopPerformingVideos,
} from 'Reducers/generatedReport'
import SliderModule from 'Components/Modules/SliderModule'
import RouterLoading from 'Components/RouterLoading'

class Slider extends React.Component {
  componentDidMount() {
    const { getTopPerformingVideosRequest, reportId } = this.props
    getTopPerformingVideosRequest({ reportId })
  }

  changeSelectedVideo = (video) => {
    this.props.setSelectedVideo(video)
  }

  render() {
    const {
      topPerformingVideos: { data, loading, selectedVideo },
    } = this.props

    if (!data && loading) {
      return <RouterLoading />
    }

    return (
      <SliderModule
        data={data}
        moduleKey={'Reports/TopPerformingVideos'}
        title="Top Performing Videos"
        selectedVideo={selectedVideo}
        changeSelectedVideo={this.changeSelectedVideo}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  topPerformingVideos: makeSelectReportsTopPerformingVideos(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Slider)
