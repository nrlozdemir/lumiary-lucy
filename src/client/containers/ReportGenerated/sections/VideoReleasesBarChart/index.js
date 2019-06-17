import React from 'react'
import VideoReleasesBarChartModule from 'Components/Modules/VideoReleasesBarChartModule'
import { isDataSetEmpty } from 'Utils'

class VideoReleasesBarChart extends React.Component {
  componentDidMount() {
    const { action, report } = this.props
    action({ report })
  }

  render() {
    const {
      data: { data, loading },
    } = this.props

    const isEmpty =
      !loading &&
      (!data ||
        (!!data &&
          (!data.length ||
            (!!data.length &&
              data.every((dataset) => isDataSetEmpty(dataset))))))

    return (
      <VideoReleasesBarChartModule
        data={data}
        moduleKey={'ReportGenerated/VideoReleasesBarChartModule'}
        title="Video Releases vs Engagement"
        legend={[
          { label: 'Videos', color: 'cool-blue' },
          { label: 'Engagement', color: 'coral-pink' },
        ]}
        legendEnd={true}
        isEmpty={isEmpty}
      />
    )
  }
}

export default VideoReleasesBarChart
