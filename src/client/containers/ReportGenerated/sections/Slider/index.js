import React from 'react'
import SliderModule from 'Components/Modules/SliderModule'
import RouterLoading from 'Components/RouterLoading'
import { isEmpty, isEqual } from 'lodash'

class Slider extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {
      data: { data, loading, selectedVideo },
    } = this.props
    const {
      data: {
        data: nextData,
        loading: nextLoading,
        selectedVideo: nextSelectedVideo,
      },
    } = nextProps

    return (
      (data && !isEqual(JSON.stringify(data), JSON.stringify(nextData))) ||
      loading !== nextLoading ||
      !isEqual(JSON.stringify(selectedVideo), JSON.stringify(nextSelectedVideo))
    )
  }

  componentDidMount() {
    const { action, report } = this.props
    action({ report })
  }

  changeSelectedVideo = (video) => {
    this.props.setSelectedVideo(video)
  }

  render() {
    const {
      data: { data, loading, selectedVideo },
    } = this.props

    return (
      <SliderModule
        data={data || []}
        moduleKey={'BrandInsights/TopPerformingVideos'}
        title="Top Performing Videos"
        selectedVideo={selectedVideo}
        changeSelectedVideo={this.changeSelectedVideo}
        loading={loading}
      />
    )
  }
}

export default Slider
