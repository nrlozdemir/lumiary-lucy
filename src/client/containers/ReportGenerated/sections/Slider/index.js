import React from 'react'
import SliderModule from 'Components/Modules/SliderModule'
import RouterLoading from 'Components/RouterLoading'

class Slider extends React.Component {
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

export default Slider
