import React, { Component } from 'react'

import VideoReleasesBarChartModule from 'Components/Modules/VideoReleasesBarChartModule'

class VideoReleasesBarChart extends Component {
  callBack = (data, moduleKey) => {
    console.log(data)
  }

  render() {
    const {
      data
    } = this.props

    return (
      <VideoReleasesBarChartModule
        data={data}
        moduleKey={'ReportGenerated/VideoReleasesBarChartModule'}
        title="Video Releases vs Engagement"
        action={this.callBack}
        legend={[
          { label: 'Videos', color: 'blueDot' },
          { label: 'Engagement', color: 'coralPinkDot' },
        ]}
        legendEnd={true}
      />
    )
  }
}

export default VideoReleasesBarChart
