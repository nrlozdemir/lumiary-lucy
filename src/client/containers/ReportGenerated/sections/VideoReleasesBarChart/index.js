import React, { Component } from 'react'

import VideoReleasesBarChartModule from 'Components/Modules/VideoReleasesBarChartModule'

class VideoReleasesBarChart extends Component {
  callBack = (data, moduleKey) => {}

  render() {
    const { data } = this.props

    let chartData

    if (this.props.data) {
      chartData = this.props.data
      chartData.labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

      Object.values(chartData.datasets).map((el, i) => {
        chartData.datasets[i].label = 'Dataset 2'
        chartData.datasets[i].backgroundColor = '#5292E5'
        if (i % 2 == 0) {
          chartData.datasets[i].label = 'Dataset 1'
          chartData.datasets[i].backgroundColor = '#2FD7C4'
        }
      })
    }

    return (
      <VideoReleasesBarChartModule
        data={this.props.data && chartData}
        moduleKey={'ReportGenerated/VideoReleasesBarChartModule'}
        title="Video Releases vs Engagement"
        action={this.callBack}
        legend={[
          { label: 'Videos', color: 'cool-blue' },
          { label: 'Engagement', color: 'coral-pink' },
        ]}
        legendEnd={true}
      />
    )
  }
}

export default VideoReleasesBarChart
